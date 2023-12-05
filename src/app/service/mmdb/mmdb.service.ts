import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Actor } from 'src/app/common/actor';
import { Movie } from 'src/app/common/movie';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MmdbService {
  private movieUrl = environment.baseUrl+"/movies";
  private actorUrl = environment.baseUrl+"/actors";
  private getActorsByMovieIdUrl = environment.baseUrl + "/actors/findByMovieId";
  private getMoviesByActorIdUrl = environment.baseUrl + "/movies/findByActorId";

  movieIdFromMain = -1;
  actorIdFromMain = -1;
  movies: Movie[] = [];
  actors: Actor[] = [];
  movieToDisplay: Movie = new Movie(-1,"","","",new Date(0));
  actorToDisplay: Actor = new Actor(-1,"","","");

  constructor(private httpClient: HttpClient,
    private router: Router) {}
    
  async buildMovieList(){
    this.httpClient.get<Movie>(this.movieUrl+"/all").subscribe(
      data=>{
        console.log("svc");
        console.log(data);
        this.movies.push(data);
      }
    );
    return true;
  }

  buildMovieDetail(movieID: number){
    this.movieIdFromMain = movieID;
    this.httpClient.get<Actor[]>(this.getActorsByMovieIdUrl+'/'+movieID).subscribe(
      data=>{
        this.actors = data;
      }
    )
    this.httpClient.get<Movie>(this.movieUrl+"/"+movieID).subscribe(
      data=>{
        this.movieToDisplay = data;
        this.router.navigate(['/mmdb/movie-display']);
      }
    )
  }

  buildActorDetail(actorID: number){
    this.actorIdFromMain = actorID;
    this.httpClient.get<Movie[]>(this.getMoviesByActorIdUrl+"/"+actorID).subscribe(
      data=>{this.movies = data}
    )
    this.httpClient.get<Actor>(this.actorUrl+"/"+actorID).subscribe(
      data=>{
        this.actorToDisplay = data;
        this.router.navigate(['/mmdb/actor-display']);
      }
    )
  }

  reset(){
    this.movieIdFromMain = -1;
    this.actorIdFromMain = -1;
    this.movies = [];
    this.actors = [];
    this.movieToDisplay = new Movie(-1,"","","",new Date(0));
    this.actorToDisplay = new Actor(-1,"","","");
  }
}
