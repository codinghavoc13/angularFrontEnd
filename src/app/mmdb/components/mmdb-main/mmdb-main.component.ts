import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Movie } from '../../common/movie';
import { MmdbService } from '../../service/mmdb.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mmdb-main',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './mmdb-main.component.html',
  styleUrl: './mmdb-main.component.css'
})
export class MmdbMainComponent {
  private baseUrl = environment.baseUrl+"/movies";
  private allUrl = this.baseUrl + "/all";
  movies: Movie[] = [];

  constructor(private mmdbSvc: MmdbService,
    private httpClient: HttpClient){}

    ngOnInit(): void {
      // this.buildMovieList();
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
