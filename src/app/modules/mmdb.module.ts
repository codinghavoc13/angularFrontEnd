import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared.module';
import { RouterModule, Routes } from '@angular/router';

import { MovieDisplayComponent } from '../components/mmdb/movie-display/movie-display.component';
import { MmdbMainComponent } from '../components/mmdb/mmdb-main/mmdb-main.component';
import { ActorListComponent } from '../components/mmdb/actor-list/actor-list.component';
import { ActorDisplayComponent } from '../components/mmdb/actor-display/actor-display.component';
import { MovieListComponent } from '../components/mmdb/movie-list/movie-list.component';

const routes: Routes = [
  {path: 'mmdb', component: MmdbMainComponent},
  {path: 'mmdb/movie-display', component: MovieDisplayComponent},
  {path: 'mmdb/actor-display', component: ActorDisplayComponent}
];

@NgModule({
  declarations: [
    MovieDisplayComponent,
    MmdbMainComponent,
    ActorListComponent,
    ActorDisplayComponent,
    MovieListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    MovieDisplayComponent,
    MmdbMainComponent,
    ActorListComponent,
    ActorDisplayComponent,
    MovieListComponent
  ]
})
export class MmdbModule { }
