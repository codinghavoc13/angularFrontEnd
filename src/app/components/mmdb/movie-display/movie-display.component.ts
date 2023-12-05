import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actor } from 'src/app/common/actor';
import { Movie } from 'src/app/common/movie';
import { MmdbService } from 'src/app/service/mmdb/mmdb.service';

@Component({
  selector: 'app-movie-display',
  templateUrl: './movie-display.component.html',
  styleUrls: ['./movie-display.component.css']
})
export class MovieDisplayComponent implements OnInit{
  movieToDisplay: Movie = new Movie(-1,"","","",new Date(0));

  constructor(private router: Router,
    private mmdbSvc: MmdbService){}

  ngOnInit(): void {
    this.resetMovie();
    this.movieToDisplay = this.mmdbSvc.movieToDisplay;
    if(this.movieToDisplay.movie_id === -1){
      this.router.navigate(['/mmdb']);
    }
  }

  resetMovie(){
    this.movieToDisplay= new Movie(-1,"","","",new Date(0));
  }
}
