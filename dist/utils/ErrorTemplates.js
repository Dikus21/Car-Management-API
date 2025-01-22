"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.NotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.BadRequestError = void 0;
const AppError_1 = require("./AppError");
class BadRequestError extends AppError_1.AppError {
    constructor(detail, message = "Bad Request") {
        super(message, detail, 400);
    }
}
exports.BadRequestError = BadRequestError;
class UnauthorizedError extends AppError_1.AppError {
    constructor(detail, message = "Unauthorized") {
        super(message, detail, 401);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends AppError_1.AppError {
    constructor(detail, message = "Forbidden") {
        super(message, detail, 403);
    }
}
exports.ForbiddenError = ForbiddenError;
class NotFoundError extends AppError_1.AppError {
    constructor(detail, message = "Resource Not Found") {
        super(message, detail, 404);
    }
}
exports.NotFoundError = NotFoundError;
class InternalServerError extends AppError_1.AppError {
    constructor(detail, message = "Internal Server Error") {
        super(message, detail, 500, false);
    }
}
exports.InternalServerError = InternalServerError;
