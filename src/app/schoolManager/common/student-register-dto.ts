export class StudentRegisterDto {
    constructor(
        public firstName: string,
        public lastName: string,
        public role: string,
        public userName: string,
        public schoolStudentId: string,
        public password: string
    ){}
}
