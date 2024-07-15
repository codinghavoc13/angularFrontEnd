import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterLink, RouterLinkActive, RouterOutlet
  ],
  exports: [
    RouterLink, RouterLinkActive, RouterOutlet
  ]
})
export class MainModule { }
