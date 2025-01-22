"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validateDTO;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
function validateDTO(dto) {
    return async (req, res, next) => {
        const isBodyEmpty = Object.keys(req.body).length === 0;
        const object = (0, class_transformer_1.plainToInstance)(dto, isBodyEmpty ? req.query : req.body);
        const errors = await (0, class_validator_1.validate)(object, {
            skipMissingProperties: false,
        });
        if (errors.length > 0) {
            let errorMessages = {};
            errors.forEach((error) => {
                const constraints = error.constraints;
                if (constraints) {
                    // console.log(constraints);
                    errorMessages[error.property] = Object.values(constraints).join("; ");
                }
            });
            res.status(400).json(errorMessages);
            return;
        }
        next();
    };
}
