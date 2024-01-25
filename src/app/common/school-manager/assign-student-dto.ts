import { CPTDto } from "./cpt-dto";

export class AssignStudentDto {
    constructor(
        // public course_id: number,
        public studentIds: number[],
        // public teacher_id: number,
        public cpt: CPTDto
    ){
    }
}
