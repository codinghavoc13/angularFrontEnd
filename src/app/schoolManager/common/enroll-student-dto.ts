import { RegisterDto } from "./register-dto";

export class EnrollStudentDto {
    parentId: number | undefined;
    student: RegisterDto |undefined;
}
