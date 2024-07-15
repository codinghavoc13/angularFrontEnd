import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActorListComponent } from '../../components/actor-list/actor-list.component';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ActorListComponent,
    MovieListComponent
  ],
  exports: [
    ActorListComponent,
    MovieListComponent
  ]
})
export class MmdbModule { }
