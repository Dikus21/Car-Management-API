export class TemplateResponse {
    static successResponse(data: any): Record<string, any>;
    static successResponse(message: string): Record<string, any>;
    static successResponse(param: any): Record<string, any> {
        if (typeof param === "string") {
            return {
                status: 200,
                message: param,
            };
        } else {
            return {
                status: 200,
                message: "Success",
                data: param,
            };
        }
    }

    static errorResponse(status: number, message: string): Record<string, any> {
        return {
            status: status,
            message: message,
        };
    }
}