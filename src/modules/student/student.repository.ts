import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { StudentEntity } from "./entities/student.entity";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";

@Injectable()
export class StudentRepository extends Repository<StudentEntity> {

    constructor(private readonly dataSource: DataSource) {
        super(StudentEntity, dataSource.createEntityManager());
    }

    async createEntity(dto: CreateStudentDto): Promise<StudentEntity | Error> {
        try {
            const {
                name,
                studnentId,
                program,
                phone,
                email,
                bloodGroup
            } = dto;
            const entity = this.create({
                name,
                studnentId,
                program,
                phone,
                email,
                bloodGroup
            });
            await this.save(entity);
            return entity;
        }
        catch (e) {
            return e;
        }
    }

    async findByFilterQuery(query: any): Promise<StudentEntity[] | Error> {
        try {
            return await this.find({
                where: { ...query, isDeleted: false }
            });
        }
        catch (e) {
            return e;
        }
    }

    async findOneEntity(id: string): Promise<StudentEntity | Error> {
        try {
            return await this.findOne({ where: { id: id } });
        }
        catch (e) {
            return e;
        }
    }

    async updateEntity(id: string, dto: UpdateStudentDto): Promise<StudentEntity | Error> {
        try {
            await this.update(id, dto);
            return await this.findOne({ where: { id: id } });
        }
        catch (e) {
            return e;
        }
    }

    async deleteEntity(id: string): Promise<boolean | Error> {
        try {
            const updateResult = await this.dataSource
                .createQueryBuilder()
                .update(StudentEntity)
                .set({ isDeleted: true })
                .where("id = :id", { id: id })
                .execute();
            if (updateResult.affected > 0) {
                return true;
            }
            return false;
        }
        catch (e) {
            return e;
        }
    }
}