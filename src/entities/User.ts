import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {AbstractDate} from "./AbstractDate";
import {Exclude} from "class-transformer";
import {Car} from "./Car";

@Entity()
export class User extends AbstractDate {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    name!: string;
    @Column()
    email!: string;
    @Column()
    @Exclude()
    password!: string;
    @Column()
    role!: string;
    @Column({nullable:true, type:"text"})
    refreshToken?: string | null;
    @OneToMany(() => Car, (car) => car.creator)
    createdCars?: Car[];
    @OneToMany(() => Car, (car) => car.updater)
    updatedCars?: Car[];
    @OneToMany(() => Car, (car) => car.deleter)
    deletedCars?: Car[];
}