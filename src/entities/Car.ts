import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractDate } from "./AbstractDate";
import { User } from "./User";

@Entity()
export class Car extends AbstractDate {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  model!: string;
  @Column()
  year!: string;
  @Column()
  rentPerDay!: number;
  @Column({ nullable: true })
  manufacture?: string;
  @Column()
  capacity?: number;
  @Column()
  transmission?: string;
  @Column()
  withDriver?: boolean;
  @Column()
  imagePublicId!: string;
  @Column()
  imageURL!: string;
  @Column({nullable: true})
  startRent?: Date;
  @Column({nullable: true})
  endRent?: Date;
  @Column({ nullable: true, type: "text" })
  description?: string;
  @ManyToOne(() => User, (user) => user.createdCars)
  creator?: User;
  @ManyToOne(() => User, (user) => user.updatedCars)
  updater?: User;
  @ManyToOne(() => User, (user) => user.deletedCars)
  deleter?: User;
}
