import { Component } from '@angular/core';
import { Movie } from '../../common/movie';
import { MmdbService } from '../../service/mmdb.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {
  movies: Movie[] = [];

  constructor(private mmdbSvc: MmdbService){}

  ngOnInit(): void{
    this.movies = this.mmdbSvc.movieDetails.movies;
  }

  prepMovieDetailsPage(actorId: number){
    this.mmdbSvc.buildMovieDetail(actorId);
  }

}
