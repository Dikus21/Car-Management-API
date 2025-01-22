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
class CarSearch {
}
exports.default = CarSearch;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "withDriver Is Required" }),
    (0, class_validator_1.Matches)(/^(true|false)$/, {
        message: "withDriver must be a true or false",
    }),
    __metadata("design:type", String)
], CarSearch.prototype, "withDriver", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Start Date Is Required" }),
    (0, class_validator_1.Matches)(/^\d{4}-\d{2}-\d{2}$/, {
        message: "startRent must be in the format yyyy-mm-dd",
    }),
    __metadata("design:type", String)
], CarSearch.prototype, "startRent", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Capacity Is Required" }),
    (0, class_validator_1.IsNumberString)({ no_symbols: true }, { message: "Capacity must be a valid number and no symbols" }),
    __metadata("design:type", String)
], CarSearch.prototype, "capacity", void 0);
