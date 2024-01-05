import { RegisterDto } from "./register-dto";

export class EnrollStudentDto {
    parent_id: number | undefined;
    student: RegisterDto |undefined;
}
