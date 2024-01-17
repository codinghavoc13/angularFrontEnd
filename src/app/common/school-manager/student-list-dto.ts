import { CourseDetailDto } from "./course-detail-dto";
import { UserDto } from "./user-dto";

export class StudentListDto {
    constructor(
        public course: CourseDetailDto,
        public students: UserDto[]
    ){}
}
