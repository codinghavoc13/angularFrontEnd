export class CourseDetailDto {
    constructor(
        public courseId: number,
        public firstName: string,
        public lastName: string,
        public courseName: string
    ){}
}

// public Long course_id;
//     public String first_name;
//     public String last_name;
//     public String course_name;  