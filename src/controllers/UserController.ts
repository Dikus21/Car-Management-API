import { User } from "../entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import ErrorTemplate from "../middlewares/ErrorTemplate";

export default class UserController {
  public async registerUser(req: any, res: any) {
    try {
      const token = req.cookies.accessToken;
      if (token) {
        jwt.verify(
          token,
          process.env.ACCESS_TOKEN_SECRET!,
          (err: any, decoded: any) => {
            if (err) {
              return res.status(403).json({ error: "Forbidden" });
            } else if (decoded.userRole == "SUPER_ADMIN") {
              req.role = "ADMIN";
            } else {
              req.role = "USER";
            }
          }
        );
      } else {
        req.role = "USER";
      }
      const { name, email, password, confirmPassword } = req.body;
      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
      }
      const user = await User.findOne({ where: { email: email } });
      if (user) {
        return res.status(400).json({ error: "Email Already Exist" });
      }
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      await User.save({
        name: name,
        email: email,
        password: hashedPassword,
        role: req.role,
      });
      return res.json({ message: `${req.role} Registered successfully!` });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  }

  public async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (!user) {
        throw new ErrorTemplate("Invalid credentials", 400);
      }
      const match = await bcrypt.compare(req.body.password, user!.password);
      if (!match) {
        throw new ErrorTemplate("Invalid credentials", 400);
      }
      const userId = user!.id;
      const userName = user!.name;
      const userEmail = user!.email;
      const userRole = user!.role;
      const accessToken = jwt.sign(
        { userId, userName, userEmail, userRole },
        process.env.ACCESS_TOKEN_SECRET!,
        {
          expiresIn: "1h",
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
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
      res.json({ accessToken });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  public async logoutUser(req: any, res: Response) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (refreshToken == null) {
        return res.status(401).json({ error: "unauthorized" });
      }
      await User.update(req.userId, { refreshToken: null });
      res.clearCookie("refreshToken");
      res.clearCookie("accessToken");
      return res.json({ message: "Logged out success" });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  public async getAllUsers(req: Request, res: Response) {
    try {
      const users = await User.find({
        select: ["id", "name", "email", "role", "refreshToken"],
      });
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  public async getUserProfile(req: any, res: any) {
    try {
      const user = await User.findOne({ where: { email: req.email } });
      if (!user) {
        return res.status(404).json({ error: "User not found!" });
      }
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  }

  public async deleteUser(req: any, res: any) {
    try {
      await User.update(req.userId, { deletedAt: new Date() });
      return res.json({ message: "User deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
}
