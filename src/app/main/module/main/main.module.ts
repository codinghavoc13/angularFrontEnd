import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // RouterLink, RouterLinkActive, RouterOutlet,
    // BsDropdownModule.forRoot()
  ],
  exports: [
    CommonModule,
    // RouterLink, RouterLinkActive, RouterOutlet
  ]
})
export class MainModule { }
