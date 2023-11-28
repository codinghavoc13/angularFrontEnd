export class CipherBody {
    constructor(
        public msg: string,
        public keyOne: number,
        public keyTwo: number,
        public action: string) {

        }
}
