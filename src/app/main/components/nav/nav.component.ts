import { Component } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MainModule } from '../../module/main/main.module';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [BsDropdownModule,
    MainModule
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

}
