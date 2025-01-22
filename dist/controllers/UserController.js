"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entities/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TemplateResponse_1 = require("../utils/TemplateResponse");
const ErrorTemplates_1 = require("../utils/ErrorTemplates");
class UserController {
    async registerUser(req, res, next) {
        try {
            const token = req.cookies.accessToken;
            let role = "USER";
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                    if (err) {
                        throw new ErrorTemplates_1.ForbiddenError("Client doesn't have permission to access the requested resource");
                    }
                    else if (decoded.userRole == "SUPER_ADMIN") {
                        role = "ADMIN";
                    }
                });
            }
            const { name, email, password, confirmPassword } = req.body;
            if (password !== confirmPassword) {
                throw new ErrorTemplates_1.BadRequestError("Password does not match");
            }
            const user = await User_1.User.findOne({ where: { email: email } });
            if (user) {
                throw new ErrorTemplates_1.BadRequestError("User exist, please go to login page");
            }
            const salt = await bcrypt_1.default.genSalt();
            const hashedPassword = await bcrypt_1.default.hash(password, salt);
            await User_1.User.save({
                name: name,
                email: email,
                password: hashedPassword,
                role: role,
            });
            res
                .status(200)
                .json(TemplateResponse_1.TemplateResponse.successResponse(`${role} Registered successfully!`));
            return;
        }
        catch (error) {
            // console.log(error);
            next(error);
        }
    }
    async loginUser(req, res, next) {
        try {
            const user = await User_1.User.findOne({
                where: {
                    email: req.body.email,
                },
            });
            const match = user ? await bcrypt_1.default.compare(req.body.password, user.password) : false;
            if (!match) {
                throw new ErrorTemplates_1.UnauthorizedError("Invalid Credentials");
            }
            const userId = user.id;
            const userName = user.name;
            const userEmail = user.email;
            const userRole = user.role;
            const accessToken = jsonwebtoken_1.default.sign({ userId, userName, userEmail, userRole }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
            });
            const refreshToken = jsonwebtoken_1.default.sign({ userId, userName, userEmail, userRole }, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
            });
            await User_1.User.update(userId, { refreshToken: refreshToken });
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.json({ accessToken });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    async logoutUser(req, res, next) {
        try {
            await User_1.User.update(res.locals.userId, { refreshToken: null });
            res.clearCookie("refreshToken");
            res.status(200).json({ message: "Logged out success" });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    async getAllUsers(req, res, next) {
        try {
            const users = await User_1.User.find({
                select: ["id", "name", "email", "role", "refreshToken"],
            });
            res.status(200).json(users);
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    async getUserProfile(req, res, next) {
        try {
            const user = await User_1.User.findOne({ where: { email: res.locals.email } });
            if (!user) {
                throw new ErrorTemplates_1.BadRequestError("User Not Found");
            }
            res.status(200).json(user);
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    async deleteUser(req, res, next) {
        try {
            await User_1.User.update(res.locals.userId, { deletedAt: new Date() });
            res.status(200).json({ message: "User deleted successfully" });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
}
exports.default = UserController;
