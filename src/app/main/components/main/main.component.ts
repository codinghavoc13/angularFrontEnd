import { Component } from '@angular/core';
import { MainModule } from '../../module/main/main.module';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MainModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
