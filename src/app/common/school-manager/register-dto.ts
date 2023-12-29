export class RegisterDto {
    constructor(
        public firstName: string,
        public lastName: string,
        public role: string,
        public email: string,
        public username: string,
        public schoolStudentId: string
    ){}
    // userId: number,
    // firstName: string,
    // lastName: string,
    // role: string,
    // username: string,
    // emailString: string,
    // phoneString: string,
    // schoolStudentId: string,
    // gradeLevel: string
}
