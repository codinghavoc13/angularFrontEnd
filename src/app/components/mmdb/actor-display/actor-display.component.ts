import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actor } from 'src/app/common/actor';
import { MmdbService } from 'src/app/service/mmdb/mmdb.service';

@Component({
  selector: 'app-actor-display',
  templateUrl: './actor-display.component.html',
  styleUrls: ['./actor-display.component.css']
})
export class ActorDisplayComponent implements OnInit{
  actorToDisplay: Actor = new Actor(-1,"","","");

  constructor(private router: Router,
    private mmdbSvc: MmdbService){}

  ngOnInit(): void {
    this.resetActor();
    this.actorToDisplay = this.mmdbSvc.actorToDisplay;
    if(this.actorToDisplay.actor_id === -1){
      this.router.navigate(['/mmdb']);
    }
  }

  resetActor(){
    this.actorToDisplay = new Actor(-1,"","","");
  }
}
