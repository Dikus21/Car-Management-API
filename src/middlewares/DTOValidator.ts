import { NextFunction, Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export default function validateDTO(dto: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const isBodyEmpty: boolean = Object.keys(req.body).length === 0;

    const object = plainToInstance(dto, isBodyEmpty ? req.query : req.body);
    const errors = await validate(object as object, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      let errorMessages: Record<string, string> = {};
      errors.forEach((error) => {
        const constraints = error.constraints;
        if (constraints) {
          console.log(constraints);
          errorMessages[error.property] = Object.values(constraints).join("; ");
        }
      });

      return res.status(400).json(errorMessages);
    }

    next();
  };
}
