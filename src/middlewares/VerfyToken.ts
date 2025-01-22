import jwt, { TokenExpiredError } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../utils/ErrorTemplates";

export default function verifyToken(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("VERIFY TOKEN");
      const accessToken = req.headers["authorization"]?.split(" ")[1]; // Get the Authorization header
      if (!accessToken) {
        throw new UnauthorizedError("User is not authenticated");
      }

      jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET!,
        (err: any, decoded: any) => {
          if (err) {
            if (err instanceof TokenExpiredError) {
              throw new UnauthorizedError("access_token_expired");
            } else {
              throw new UnauthorizedError("Invalid Token");
            }
          } else if (
            !allowedRoles.includes(decoded.userRole) &&
            !allowedRoles.includes("PUBLIC")
          ) {
            throw new UnauthorizedError(
              `Unauthorized Role: ${decoded.userRole} role is not allowed`
            );
          }
          res.locals.userId = decoded.userId;
          res.locals.email = decoded.userEmail;
          next();
        }
      );
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
