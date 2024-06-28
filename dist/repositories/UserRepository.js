"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
class UserRepository extends typeorm_1.Repository {
    constructor(manager) {
        super(User_1.User, manager);
    }
    async findByEmail(email) {
        return this.findOne({ where: { email } });
    }
}
exports.UserRepository = UserRepository;
