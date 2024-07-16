export class RegisterDto {
    constructor(
        public firstName: string,
        public lastName: string,
        public role: string,
        public username: string,
        public schoolStudentId: string,
        public password: string,
        public emailString: string,
        public verified: boolean
    ){}
}
