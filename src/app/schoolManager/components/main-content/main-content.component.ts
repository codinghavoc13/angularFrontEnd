import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { MainModule } from '../../../main/module/main/main.module';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    MainModule
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent {
  constructor(public smUserSvc: UserService) { 
    console.log('Main-Content constructor')
  }

  logout(){
    this.smUserSvc.logout();
  }
}
