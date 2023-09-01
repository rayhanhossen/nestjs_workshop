import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateStudentDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    studnentId: string;

    @IsNotEmpty()
    program: string;

    @IsNotEmpty()
    phone: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    bloodGroup: string;
}
