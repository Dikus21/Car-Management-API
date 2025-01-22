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
exports.default = verifyToken;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const ErrorTemplates_1 = require("../utils/ErrorTemplates");
function verifyToken(...allowedRoles) {
    return (req, res, next) => {
        var _a;
        try {
            console.log("VERIFY TOKEN");
            const accessToken = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1]; // Get the Authorization header
            if (!accessToken) {
                throw new ErrorTemplates_1.UnauthorizedError("User is not authenticated");
            }
            jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                        throw new ErrorTemplates_1.UnauthorizedError("access_token_expired");
                    }
                    else {
                        throw new ErrorTemplates_1.UnauthorizedError("Invalid Token");
                    }
                }
                else if (!allowedRoles.includes(decoded.userRole) &&
                    !allowedRoles.includes("PUBLIC")) {
                    throw new ErrorTemplates_1.UnauthorizedError(`Unauthorized Role: ${decoded.userRole} role is not allowed`);
                }
                res.locals.userId = decoded.userId;
                res.locals.email = decoded.userEmail;
                next();
            });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    };
}
