export class Staff {
    constructor(
        public staff_id: number,
        public firstname: string,
        public lastname: string,
        public role: string,
        public username: string,
        public password_hash: string,
        public password_salt: string,
        public email_string: string,
        public phone_string: string
    ){}
}