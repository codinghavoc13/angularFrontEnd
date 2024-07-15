import { Component } from '@angular/core';
import { MainModule } from '../../../main/module/main/main.module';

@Component({
  selector: 'app-cipher-main',
  standalone: true,
  imports: [
    MainModule
  ],
  templateUrl: './cipher-main.component.html',
  styleUrl: './cipher-main.component.css'
})
export class CipherMainComponent {

}
