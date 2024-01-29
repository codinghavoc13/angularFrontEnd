export class CourseDetailDto {
    constructor(
        public courseBlock: string,
        public courseId: number,
        public courseName: string,
        public cptId: number,
        public credit: number,
        public period: number,
        public teacherFirstName: string,
        public teacherLastName: string,
        public teacherId: number
        //add the cptId
    ){}
}