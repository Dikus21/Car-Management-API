"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyToken(...allowedRoles) {
    return (req, res, next) => {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            return res
                .status(401)
                .json({ error: "Unauthorized: Please Login First" });
        }
        jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: "Forbidden: Invalid token" });
            }
            else if (!allowedRoles.includes(decoded.userRole) &&
                !allowedRoles.includes("PUBLIC")) {
                return res.status(401).json({
                    error: `Unauthorized Role: ${decoded.userRole} role is not allowed`,
                });
            }
            req.userId = decoded.userId;
            req.email = decoded.userEmail;
            req.role = decoded.userRole;
            next();
        });
    };
}
exports.default = verifyToken;
