import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {AbstractDate} from "./AbstractDate";
import {User} from "./User";

@Entity()
export class Car extends AbstractDate{
    @PrimaryGeneratedColumn()
    id!:number;
    @Column()
    model!:string;
    @Column()
    year!:string;
    @Column()
    price!:string;
    @Column()
    image!:string;
    @ManyToOne(() => User, (user) => user.createdCars)
    creator?:User;
    @ManyToOne(() => User, (user) => user.updatedCars)
    updater?:User;
    @ManyToOne(() => User, (user) => user.deletedCars)
    deleter?:User;
}