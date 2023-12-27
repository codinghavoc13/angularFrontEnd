import { Actor } from "./actor";
import { Movie } from "./movie";

export class MMDBResponse {
    constructor(
        public actor: Actor,
        public actors: Actor[],
        public movie: Movie,
        public movies: Movie[]
    ){}

}
