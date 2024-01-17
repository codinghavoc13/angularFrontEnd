export class CourseDetailDto {
    constructor(
        public courseId: number,
        public teacherFirstName: string,
        public teacherLastName: string,
        public teacher_id: number,
        public courseName: string,
        public courseLength: string,
        public period: number
    ){}
}