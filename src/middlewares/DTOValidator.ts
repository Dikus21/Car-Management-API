import {NextFunction, Request, Response} from "express";
import {plainToInstance} from "class-transformer";
import {validate} from "class-validator";


export default function validateDTO(dto: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const object = plainToInstance(dto, req.query);
        const errors = await validate(object as object, { skipMissingProperties: false });

        if (errors.length > 0) {
            let errorMessages: Record<string, string> = {};
            errors.forEach(error => {
                const constraints = error.constraints;
                if (constraints) {
                    console.log(constraints)
                    errorMessages[error.property] = Object.values(constraints).join('; ');
                }
            });

            return res.status(400).json(errorMessages);
        }

        next();
    };
}