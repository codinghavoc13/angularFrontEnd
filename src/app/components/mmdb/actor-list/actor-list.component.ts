import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/app/common/actor';
import { MmdbService } from 'src/app/service/mmdb/mmdb.service';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css']
})
export class ActorListComponent implements OnInit{
  actors: Actor[] = [];

  constructor(private mmdbSvc: MmdbService){}

  ngOnInit(): void {
    this.actors = this.mmdbSvc.actors;
  }

  prepActorDetailsPage(movieId: number){
    this.mmdbSvc.buildActorDetail(movieId);
  }

}
