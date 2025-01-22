import { AppError } from "./AppError";

export class BadRequestError extends AppError {
    constructor(detail: string ,message = "Bad Request") {
        super(message, detail, 400);
    }
}

export class UnauthorizedError extends AppError {
    constructor(detail: string, message = "Unauthorized") {
        super(message, detail, 401);
    }
}

export class ForbiddenError extends AppError {
    constructor(detail: string, message = "Forbidden") {
        super(message, detail, 403);
    }
}

export class NotFoundError extends AppError {
    constructor(detail: string ,message = "Resource Not Found") {
        super(message, detail, 404);
    }
}

export class InternalServerError extends AppError {
    constructor(detail: string ,message = "Internal Server Error") {
        super(message, detail, 500, false); 
    }
}