export class AssignStudentDto {
    constructor(
        public course_id: number,
        public student_ids: number[]
    ){
    }
}
