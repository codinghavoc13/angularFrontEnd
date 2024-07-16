export class UserDto {
    constructor(
        public userId: number,
        public firstName: string,
        public lastName: string,
        public emailString: string,
        public phoneString: string,
        public verified: boolean,
        public schoolStudentId: string,
        public gradeLevel: string,
        public role: string,
        public username: string
    ){}
}
