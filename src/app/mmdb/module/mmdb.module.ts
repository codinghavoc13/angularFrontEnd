import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MmdbMainComponent } from '../components/mmdb-main/mmdb-main.component';
import { MovieDisplayComponent } from '../components/movie-display/movie-display.component';
import { SharedModule } from 'src/app/shared.module';
import { ActorDisplayComponent } from '../components/actor-display/actor-display.component';
import { ActorListComponent } from '../components/actor-list/actor-list.component';
import { MovieListComponent } from '../components/movie-list/movie-list.component';


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