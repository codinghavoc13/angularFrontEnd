import { Component, OnInit } from '@angular/core';
import { Actor } from '../../common/actor';
import { MmdbService } from '../../service/mmdb.service';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css']
})
export class ActorListComponent implements OnInit{
  actors: Actor[] = [];

  constructor(private mmdbSvc: MmdbService){}

  ngOnInit(): void {
    this.actors = this.mmdbSvc.movieDetails.actors;
  }

  prepActorDetailsPage(movieId: number){
    this.mmdbSvc.buildActorDetail(movieId);
  }

}