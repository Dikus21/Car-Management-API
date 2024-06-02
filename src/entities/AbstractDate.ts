import {CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BaseEntity} from "typeorm";

export abstract class AbstractDate extends BaseEntity {
    @CreateDateColumn({type:'timestamp', name:'created_date', update:false})
    createdAt!: Date;
    @UpdateDateColumn({type:'timestamp', name:'updated_date', nullable:true})
    updatedAt?: Date;
    @DeleteDateColumn({type:'timestamp', name:'deleted_date', nullable:true})
    deletedAt?: Date;
}