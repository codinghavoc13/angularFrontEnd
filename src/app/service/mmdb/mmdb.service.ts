import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Actor } from 'src/app/common/mmdb/actor';
import { MMDBResponse } from 'src/app/common/mmdb/mmdb-response';
import { Movie } from 'src/app/common/mmdb/movie';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MmdbService {
  private allMoviesUrl = environment.baseUrl+"/movies/all";

  movieIdFromMain = -1;
  actorIdFromMain = -1;
  movies: Movie[] = [];

  nullActor: Actor = new Actor(-1,"","","");
  nullMovie: Movie = new Movie(-1,"","","",new Date(0));
  movieDetails: MMDBResponse = new MMDBResponse(this.nullActor,[],this.nullMovie,[]);
  private mmdbMovieUrl = environment.baseUrl + "/mmdb/movieDetails/";
  private mmdbActorUrl = environment.baseUrl + "/mmdb/actorDetails/";

  constructor(private httpClient: HttpClient,
    private router: Router) {}
    
  async buildMovieList(){
    this.httpClient.get<Movie>(this.allMoviesUrl).subscribe(
      data=>{
        this.movies.push(data);
      }
    );
    return true;
  }

  buildMovieDetail(movieID: number){
    this.movieIdFromMain = movieID;
    this.httpClient.get<MMDBResponse>(this.mmdbMovieUrl+movieID).subscribe(
      data=>{
        this.movieDetails = data;
        this.router.navigate(['/mmdb/movie-display']);
      }
    )
  }

  buildActorDetail(actorID: number){
    this.actorIdFromMain = actorID;
    this.httpClient.get<MMDBResponse>(this.mmdbActorUrl+actorID).subscribe(
      data=>{
        this.movieDetails = data;
        this.router.navigate(['/mmdb/actor-display']);
      }
    )
  }
}
