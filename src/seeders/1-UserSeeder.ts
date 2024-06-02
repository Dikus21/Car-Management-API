import dataSource from "../config/Database";
import {User} from "../entities/User";
import bcrypt from "bcrypt";

export default async function userSeeder() {
        const users = [
            {
                name: 'Super Admin',
                email: 'super@mail.com',
                role: 'SUPER_ADMIN',
                password: await bcrypt.hash('12345', 10),
                createdAt: new Date()
            },
            {
                name: 'Admin',
                email: 'admin@mail.com',
                role: 'ADMIN',
                password: await bcrypt.hash('12345', 10),
                createdAt: new Date()
            },
            {
                name: 'Test User',
                email: 'test@mail.com',
                role: 'USER',
                password: await bcrypt.hash('12345', 10),
                createdAt: new Date()
            }
        ].map(user => {
            const newUser = new User();
            newUser.name = user.name;
            newUser.email = user.email;
            newUser.role = user.role;
            newUser.password = user.password;
            newUser.createdAt = user.createdAt;
            return newUser;
        });

        await dataSource.manager.save(users);
        console.log(`${users.length} users have been inserted`);
}