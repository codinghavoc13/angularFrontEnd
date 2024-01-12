import { CourseDetailDto } from "./course-detail-dto";
import { UserDto } from "./user-dto";

export class StudentDetailDto {
    constructor(
        public enrolledCourses: CourseDetailDto[],
        public parents: UserDto[],
        public student: UserDto
    ){}
}
