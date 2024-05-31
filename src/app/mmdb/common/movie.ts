export class Movie {
    constructor(
        public movie_id: number,
        public movieTitle: string,
        public plotSummary: string,
        public imdbLink: string,
        public releaseDate: Date,
    ){};
}
