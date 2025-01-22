"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const EnvironmentSettings_1 = __importDefault(require("./utils/EnvironmentSettings"));
new EnvironmentSettings_1.default();
//start server
const PORT = process.env.PORT;
_1.default.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
