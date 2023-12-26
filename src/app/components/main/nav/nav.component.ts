import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MmdbService } from 'src/app/service/mmdb/mmdb.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  //add a method here to call mmdbsvc.buildmovielist, then navigate to the mmdb main page
  constructor(private mmdbSvc: MmdbService,
    private router: Router){}

  loadMMDBMain(){
    this.mmdbSvc.buildMovieList();
    this.router.navigate(['/mmdb']);
  }
}
