export class Assignment {
    constructor(
        public assignmentId: number,
        public teacherId: number,
        public assignmentTitle: string,
        public assignmentType: string,
        public assignmentDueDate: Date
    ){}
}
