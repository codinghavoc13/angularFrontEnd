export class IndividualGradeDTO {
    constructor(
        public assignmentTitle: string,
        public assignmentType: string,
        public assignmentDueDate: Date,
        public courseName: string,
        public grade: number,
        public gradeId: number,
        public period: number,
        public studentFirstName: string,
        public studentLastName: string
    ){}
}