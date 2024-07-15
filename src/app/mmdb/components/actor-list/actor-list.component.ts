import { Component } from '@angular/core';
import { MmdbService } from '../../service/mmdb.service';
import { Actor } from '../../common/actor';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actor-list',
  standalone: true,
  imports: [
    CommonModule],
  templateUrl: './actor-list.component.html',
  styleUrl: './actor-list.component.css'
})
export class ActorListComponent {
  actors: Actor[] = [];

  constructor(private mmdbSvc: MmdbService){}

  ngOnInit(): void {
    this.actors = this.mmdbSvc.movieDetails.actors;
  }

  prepActorDetailsPage(movieId: number){
    this.mmdbSvc.buildActorDetail(movieId);
  }


}
