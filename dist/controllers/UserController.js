"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entities/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    async registerUser(req, res) {
        try {
            const token = req.cookies.accessToken;
            if (token) {
                jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                    if (err) {
                        return res.status(403).json({ error: "Forbidden" });
                    }
                    else if (decoded.userRole == "SUPER_ADMIN") {
                        req.role = "ADMIN";
                    }
                    else {
                        req.role = "USER";
                    }
                });
            }
            else {
                req.role = "USER";
            }
            const { name, email, password, confirmPassword } = req.body;
            if (password !== confirmPassword) {
                return res.status(400).json({ error: "Passwords do not match" });
            }
            const user = await User_1.User.findOne({ where: { email: email } });
            if (user) {
                return res.status(400).json({ error: "Email Already Exist" });
            }
            const salt = await bcrypt_1.default.genSalt();
            const hashedPassword = await bcrypt_1.default.hash(password, salt);
            await User_1.User.save({
                name: name,
                email: email,
                password: hashedPassword,
                role: req.role,
            });
            return res.json({ message: `${req.role} Registered successfully!` });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: error });
        }
    }
    async loginUser(req, res) {
        try {
            const user = await User_1.User.findOne({
                where: {
                    email: req.body.email,
                },
            });
            if (!user) {
                return res.status(400).json({ error: "Invalid credentials" });
            }
            const match = await bcrypt_1.default.compare(req.body.password, user.password);
            if (!match) {
                return res.status(400).json({ error: "Invalid credentials" });
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
            const expiryTime = new Date();
            expiryTime.setHours(expiryTime.getHours() + 1);
            await User_1.User.update(userId, { refreshToken: refreshToken });
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 1000,
            });
            res.json({ accessToken });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: error });
        }
    }
    async logoutUser(req, res) {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (refreshToken == null) {
                return res.status(401).json({ error: "unauthorized" });
            }
            await User_1.User.update(req.userId, { refreshToken: null });
            res.clearCookie("refreshToken");
            res.clearCookie("accessToken");
            return res.json({ message: "Logged out success" });
        }
        catch (error) {
            return res.status(500).json({ error: error });
        }
    }
    async getAllUsers(req, res) {
        try {
            const users = await User_1.User.find({
                select: ["id", "name", "email", "role", "refreshToken"],
            });
            return res.json(users);
        }
        catch (error) {
            return res.status(500).json({ error: error });
        }
    }
    async getUserProfile(req, res) {
        try {
            const user = await User_1.User.findOne({ where: { email: req.email } });
            if (!user) {
                return res.status(404).json({ error: "User not found!" });
            }
            res.json(user);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }
    async deleteUser(req, res) {
        try {
            await User_1.User.update(req.userId, { deletedAt: new Date() });
            return res.json({ message: "User deleted successfully" });
        }
        catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}
exports.default = UserController;
