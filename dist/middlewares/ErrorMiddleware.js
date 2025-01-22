"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (err, req, res, next) => {
    console.log("ErrorMiddleware: SUCCESS");
    const statusCode = err.statusCode || 500;
    const response = {
        status: "error",
        statusCode: err.statusCode,
        message: err.message,
        detail: err.detail,
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
    };
    console.log(err);
    console.log(response);
    res.status(statusCode).json(response);
};
exports.default = errorMiddleware;
