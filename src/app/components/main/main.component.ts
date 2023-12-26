import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MmdbService } from 'src/app/service/mmdb/mmdb.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  //add a method here to build up the movie array in movie service, then navigate to the mmdb main page
  constructor(private mmdbSvc: MmdbService,
    private router: Router){}
    
  loadMMDBMain(){
    this.mmdbSvc.buildMovieList();
    this.router.navigate(['/mmdb']);
  }
}
