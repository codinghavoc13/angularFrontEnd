export class CourseDetailDto {
    constructor(
        public courseId: number,
        public teacherFirstName: string,
        public teacherLastName: string,
        public teacherId: number,
        public courseName: string,
        public courseBlock: string,
        public period: number,
        public credit: number
    ){}
}