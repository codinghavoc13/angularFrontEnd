import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { MainModule } from '../../../main/module/main/main.module';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    MainModule
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {
  constructor(public smUserSvc: UserService){
    
  }
}
