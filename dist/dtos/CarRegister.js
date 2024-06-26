"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
class CarRegister {
}
exports.default = CarRegister;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Model Name Is Required" }),
    __metadata("design:type", String)
], CarRegister.prototype, "model", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Year Is Required" }),
    __metadata("design:type", String)
], CarRegister.prototype, "year", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Price Is Required" }),
    (0, class_validator_1.IsNumberString)({}, { message: "Price must be a valid number" }),
    __metadata("design:type", String)
], CarRegister.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Image Is Required" }),
    __metadata("design:type", String)
], CarRegister.prototype, "image", void 0);
