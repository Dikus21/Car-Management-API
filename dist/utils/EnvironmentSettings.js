"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
class EnvironmentSettings {
    constructor() {
        dotenv_1.default.config();
        this.envFile = process.env.ENV_FILE || "prod";
        dotenv_1.default.config({ path: `./.env.${this.envFile}` });
    }
}
exports.default = EnvironmentSettings;
