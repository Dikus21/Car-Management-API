"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../entities/User");
class RefreshToken {
    static async refreshToken(req, res) {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (refreshToken == null) {
                return res.status(401).json({ error: 'Unauthorized: Please Login First' });
            }
            const user = await User_1.User.findOne({
                where: {
                    refreshToken: refreshToken
                }
            });
            if (!user) {
                return res.status(403).json({ error: 'Forbidden' });
            }
            jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(403).json({ error: 'Forbidden' });
                }
                const userId = decoded.userId;
                const userName = decoded.userName;
                const userEmail = decoded.userEmail;
                const userRole = decoded.userRole;
                const accessToken = jsonwebtoken_1.default.sign({ userId, userName, userEmail, userRole }, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
                });
                res.cookie("accessToken", accessToken, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 1000,
                });
                res.json({ accessToken });
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: error });
        }
    }
}
exports.default = RefreshToken;
