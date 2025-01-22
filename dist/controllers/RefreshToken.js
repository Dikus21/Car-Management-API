"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const User_1 = require("../entities/User");
const ErrorTemplates_1 = require("../utils/ErrorTemplates");
class RefreshToken {
    static async refreshToken(req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (refreshToken == null) {
                throw new ErrorTemplates_1.UnauthorizedError("Refresh token not found");
            }
            const user = await User_1.User.findOne({
                where: {
                    refreshToken: refreshToken,
                },
            });
            if (!user) {
                throw new ErrorTemplates_1.ForbiddenError("User not found");
            }
            jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                        throw new ErrorTemplates_1.BadRequestError("refresh_token_expired");
                    }
                    else {
                        throw new ErrorTemplates_1.ForbiddenError("Invalid Refresh Token");
                    }
                }
                const userId = decoded.userId;
                const userName = decoded.userName;
                const userEmail = decoded.userEmail;
                const userRole = decoded.userRole;
                const accessToken = jsonwebtoken_1.default.sign({ userId, userName, userEmail, userRole }, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
                });
                res.status(200).json({ accessToken });
            });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
}
exports.default = RefreshToken;
