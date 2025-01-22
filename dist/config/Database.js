"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
const EnvironmentSettings_1 = __importDefault(require("../utils/EnvironmentSettings"));
new EnvironmentSettings_1.default();
const db = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: [path_1.default.join(__dirname, "../entities/**")],
    migrations: [path_1.default.join(__dirname, "../migrations/**")],
};
const dataSource = new typeorm_1.DataSource(db);
exports.default = dataSource;
