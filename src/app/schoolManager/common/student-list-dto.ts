import { CourseDetailDto } from "./course-detail-dto";
import { UserDto } from "./user-dto";

//May need to add period information to this as well
export class StudentListDto {
    constructor(
        public course: CourseDetailDto,
        public cptId: number,
        public period: number,
        public students: UserDto[]
    ){}
}
