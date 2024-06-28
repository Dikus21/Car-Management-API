"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
const path_1 = __importDefault(require("path"));
const Database_1 = __importDefault(require("../config/Database"));
const seedersPath = path_1.default.join(__dirname, './');
async function runSeeders() {
    await Database_1.default.initialize();
    console.log("Data Source has been initialized!");
    try {
        const files = await (0, promises_1.readdir)(seedersPath);
        for (const file of files) {
            if (file.endsWith('.ts') && file !== 'runSeeders.ts') {
                const { default: seederFunction } = await Promise.resolve(`${`./${file}`}`).then(s => __importStar(require(s)));
                if (typeof seederFunction === 'function') {
                    await seederFunction();
                    console.log(`${file} executed successfully.`);
                }
            }
        }
    }
    catch (error) {
        console.error("Error during seeding:", error);
    }
    finally {
        await Database_1.default.destroy();
        console.log("Data Source has been destroyed!");
    }
}
runSeeders();
