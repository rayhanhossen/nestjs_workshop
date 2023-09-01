import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './entities/student.entity';
import { StudentRepository } from './student.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      StudentEntity
    ])
  ],
  controllers: [StudentController],
  providers: [
    StudentService,
    StudentRepository
  ],
})
export class StudentModule {}
