import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './main/components/nav/nav.component';
import { CipherMainComponent } from './cipher/components/cipher-main/cipher-main.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    NavComponent,
    CipherMainComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularFrontEnd';
}
