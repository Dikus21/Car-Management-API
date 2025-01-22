import { User } from "../entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { TemplateResponse } from "../utils/TemplateResponse";
import { BadRequestError, ForbiddenError, NotFoundError, UnauthorizedError } from "../utils/ErrorTemplates";

export default class UserController {
  public async registerUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.cookies.accessToken;
      let role = "USER";
      if (token) {
        jwt.verify(
          token,
          process.env.ACCESS_TOKEN_SECRET!,
          (err: any, decoded: any) => {
            if (err) {
              throw new ForbiddenError(
                "Client doesn't have permission to access the requested resource"
              );
            } else if (decoded.userRole == "SUPER_ADMIN") {
              role = "ADMIN";
            }
          }
        );
      }

      const { name, email, password, confirmPassword } = req.body;
      if (password !== confirmPassword) {
        throw new BadRequestError("Password does not match");
      }
      const user = await User.findOne({ where: { email: email } });
      if (user) {
        throw new BadRequestError("User exist, please go to login page");
      }
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      await User.save({
        name: name,
        email: email,
        password: hashedPassword,
        role: role,
      });
      res
        .status(200)
        .json(
          TemplateResponse.successResponse(`${role} Registered successfully!`)
        );
      return;
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  public async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      const match: boolean = user ? await bcrypt.compare(req.body.password, user!.password) : false;
      if (!match) {
        throw new UnauthorizedError("Invalid Credentials");
      }
      const userId = user!.id;
      const userName = user!.name;
      const userEmail = user!.email;
      const userRole = user!.role;
      const accessToken = jwt.sign(
        { userId, userName, userEmail, userRole },
        process.env.ACCESS_TOKEN_SECRET!,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
        }
      );
      const refreshToken = jwt.sign(
        { userId, userName, userEmail, userRole },
        process.env.REFRESH_TOKEN_SECRET!,
        {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
        }
      );

      await User.update(userId, { refreshToken: refreshToken });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  public async logoutUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await User.update(res.locals.userId, { refreshToken: null });
      res.clearCookie("refreshToken");
      res.status(200).json({ message: "Logged out success" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  public async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await User.find({
        select: ["id", "name", "email", "role", "refreshToken"],
      });
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  public async getUserProfile(req: any, res: any, next: NextFunction) {
    try {
      const user = await User.findOne({ where: { email: res.locals.email } });
      if (!user) {
        throw new BadRequestError("User Not Found");
      }
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  public async deleteUser(req: any, res: any, next: NextFunction) {
    try {
      await User.update(res.locals.userId, { deletedAt: new Date() });
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
