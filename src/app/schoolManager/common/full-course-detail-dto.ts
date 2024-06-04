import { CourseDetailDto } from "./course-detail-dto";
import { UserDto } from "./user-dto";

export class FullCourseDetailDto {
    constructor(
        public course: CourseDetailDto,
        public students: UserDto[]
    ){}
}
