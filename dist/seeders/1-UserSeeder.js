"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("../config/Database"));
const User_1 = require("../entities/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
async function userSeeder() {
    const users = [
        {
            name: 'Super Admin',
            email: 'super@mail.com',
            role: 'SUPER_ADMIN',
            password: await bcrypt_1.default.hash('12345', 10),
            createdAt: new Date()
        },
        {
            name: 'Admin',
            email: 'admin@mail.com',
            role: 'ADMIN',
            password: await bcrypt_1.default.hash('12345', 10),
            createdAt: new Date()
        },
        {
            name: 'Test User',
            email: 'user@mail.com',
            role: 'USER',
            password: await bcrypt_1.default.hash('12345', 10),
            createdAt: new Date()
        }
    ].map(user => {
        const newUser = new User_1.User();
        newUser.name = user.name;
        newUser.email = user.email;
        newUser.role = user.role;
        newUser.password = user.password;
        newUser.createdAt = user.createdAt;
        return newUser;
    });
    await Database_1.default.manager.save(users);
    console.log(`${users.length} users have been inserted`);
}
exports.default = userSeeder;
