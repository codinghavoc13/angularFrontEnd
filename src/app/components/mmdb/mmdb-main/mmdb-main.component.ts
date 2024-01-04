import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/common/mmdb/movie';
import { MmdbService } from 'src/app/service/mmdb/mmdb.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mmdb-main',
  templateUrl: './mmdb-main.component.html',
  styleUrls: ['./mmdb-main.component.css']
})
export class MmdbMainComponent implements OnInit{
  private baseUrl = environment.baseUrl+"/movies";
  private allUrl = this.baseUrl + "/all";
  movies: Movie[] = [];

  constructor(private mmdbSvc: MmdbService,
    private httpClient: HttpClient){}

  ngOnInit(): void {
    this.buildMovieList();
  }

  buildMovieList(){
    this.httpClient.get<Movie[]>(this.allUrl).subscribe(
      data=>{
        this.movies = data;
      }
    );
  }

  prepDetailsPage(movieID: number){
    this.mmdbSvc.buildMovieDetail(movieID);
  }
}
