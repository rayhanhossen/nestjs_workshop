import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentRepository } from './student.repository';
import { StudentEntity } from './entities/student.entity';

@Injectable()
export class StudentService {

  constructor(
    private readonly repository: StudentRepository
  ) { }

  async create(createStudentDto: CreateStudentDto): Promise<any | Error> {
    const data = await this.repository.createEntity(createStudentDto);
    if (!data) {
      throw new HttpException(
        'CREATE_FAILED',
        HttpStatus.BAD_REQUEST
      );
    }
    return {
      statusCode: 201,
      message: "Data Created Successfully!",
      data: data
    }
  }

  async findAll() {
    const data = await this.repository.findByFilterQuery({});
    if (!data) {
      throw new NotFoundException();
    }
    return {
      statusCode: 200,
      message: "Data Fetched Successfully!",
      data: data
    }
  }

  async findOne(id: string) {
    const data = await this.repository.findByFilterQuery({ id: id });
    if (!data) {
      throw new NotFoundException();
    }
    return {
      statusCode: 200,
      message: "Single Data Fetched Successfully!",
      data: data
    }
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const findSingleData: any = await this.repository.findOneEntity(id);
    if (!findSingleData) {
      throw new NotFoundException();
    }
    const data = await this.repository.updateEntity(id, updateStudentDto);
    if (!data) {
      throw new HttpException(
        'UPDATE_FAILED',
        HttpStatus.BAD_REQUEST
      );
    }
    return {
      statusCode: 200,
      message: "Data Updated Successfully!",
      data: data
    }
  }

  async remove(id: string) {
    const data = await this.repository.deleteEntity(id);
    if (!data) {
      throw new NotFoundException();
    }
    return {
      statusCode: 200,
      message: "Data Deleted Successfully!",
      data: data
    }
  }
}
