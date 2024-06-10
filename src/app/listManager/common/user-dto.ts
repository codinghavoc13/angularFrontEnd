export class UserDto {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public pwClear: string,
        public userId: number
    ){}
}
