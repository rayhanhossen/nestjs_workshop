import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('student')
export class StudentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    studnentId: string;

    @Column()
    program: string;

    @Column()
    phone: string;

    @Column({ unique: true })
    email: string;

    @Column()
    bloodGroup: string;

    @CreateDateColumn({ name: "createdAt", type: "datetime", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updatedAt", type: "datetime", default: () => "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;

    @Column({ default: false })
    isDeleted: boolean;
}
