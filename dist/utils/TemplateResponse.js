"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateResponse = void 0;
class TemplateResponse {
    static successResponse(param) {
        if (typeof param === "string") {
            return {
                status: 200,
                message: param,
            };
        }
        else {
            return {
                status: 200,
                message: "Success",
                data: param,
            };
        }
    }
    static errorResponse(status, message) {
        return {
            status: status,
            message: message,
        };
    }
}
exports.TemplateResponse = TemplateResponse;
