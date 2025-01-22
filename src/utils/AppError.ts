export class AppError extends Error {
    public statusCode: number;
    public detail: string;
    public isOperational: boolean;

    constructor (message: string, detail: string, statusCode: number, isOperational: boolean = true){
        super(message);
        this.detail = detail;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}