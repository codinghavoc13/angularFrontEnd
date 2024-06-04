import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actor } from '../../common/actor';
import { MMDBResponse } from '../../common/mmdb-response';
import { Movie } from '../../common/movie';
import { MmdbService } from '../../service/mmdb.service';

@Component({
  selector: 'app-actor-display',
  templateUrl: './actor-display.component.html',
  styleUrls: ['./actor-display.component.css']
})
export class ActorDisplayComponent implements OnInit{
  // actorToDisplay: Actor = new Actor(-1,"","","");

  nullActor: Actor = new Actor(-1,"","","");
  nullMovie: Movie = new Movie(-1,"","","",new Date(0));
  movieDetails: MMDBResponse = new MMDBResponse(this.nullActor,[],this.nullMovie,[]);

  constructor(private router: Router,
    private mmdbSvc: MmdbService){}

  ngOnInit(): void {
    this.movieDetails = this.mmdbSvc.movieDetails;
    if(this.movieDetails.actor.actor_id === -1){
      this.router.navigate(['/mmdb']);
    }
  }
}
