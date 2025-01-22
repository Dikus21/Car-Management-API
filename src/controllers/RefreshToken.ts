import jwt, { TokenExpiredError } from "jsonwebtoken";
import { User } from "../entities/User";
import {
  BadRequestError,
  ForbiddenError,
  UnauthorizedError,
} from "../utils/ErrorTemplates";
import { NextFunction, Request, Response } from "express";

export default class RefreshToken {
  public static async refreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (refreshToken == null) {
        throw new UnauthorizedError("Refresh token not found");
      }
      const user = await User.findOne({
        where: {
          refreshToken: refreshToken,
        },
      });
      if (!user) {
        throw new ForbiddenError("User not found");
      }
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!,
        (err: any, decoded: any) => {
          if (err) {
            if (err instanceof TokenExpiredError) {
              throw new BadRequestError("refresh_token_expired");
            } else {
              throw new ForbiddenError("Invalid Refresh Token");
            }
          }
          const userId = decoded.userId;
          const userName = decoded.userName;
          const userEmail = decoded.userEmail;
          const userRole = decoded.userRole;
          const accessToken = jwt.sign(
            { userId, userName, userEmail, userRole },
            process.env.ACCESS_TOKEN_SECRET!,
            {
              expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
            }
          );
          res.status(200).json({ accessToken });
        }
      );
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
