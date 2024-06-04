
import { Component, OnInit } from '@angular/core';
import { Movie } from '../../common/movie';
import { MmdbService } from '../../service/mmdb.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit{
  movies: Movie[] = [];

  constructor(private mmdbSvc: MmdbService){}

  ngOnInit(): void{
    this.movies = this.mmdbSvc.movieDetails.movies;
  }

  prepMovieDetailsPage(actorId: number){
    this.mmdbSvc.buildMovieDetail(actorId);
  }

}
