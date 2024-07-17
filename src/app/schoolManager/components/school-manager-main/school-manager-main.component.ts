import { Component } from '@angular/core';
import { MainModule } from '../../../main/module/main/main.module';
import { MainContentComponent } from '../main-content/main-content.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-school-manager-main',
  standalone: true,
  imports: [
    MainModule,
    MainContentComponent,
    NavbarComponent
  ],
  templateUrl: './school-manager-main.component.html',
  styleUrl: './school-manager-main.component.css'
})
export class SchoolManagerMainComponent {
  constructor(){
    console.log('SchoolManagerMain constructor')}
}
