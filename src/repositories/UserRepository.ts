import {EntityManager, Repository} from "typeorm";
import {User} from "../entities/User";


export class UserRepository extends Repository<User> {
    constructor(manager: EntityManager) {
        super(User, manager);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.findOne({where: {email}});
    }
}

