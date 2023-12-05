export class Movie {
    constructor(
        public movie_id: number,
        public movieTitle: string,
        public plotSummary: string,
        public imdbLink: string,
        public releaseDate: Date
    ){};
    // constructor(){
    //     this.movie_id = -1;
    //     this.movieTitle="";
    //     this.plotSummary="";
    //     this.imdbLink="";
    //     this.releaseDate="1970-1-1";
    // }
}
