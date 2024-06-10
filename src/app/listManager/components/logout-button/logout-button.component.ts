import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.css']
})
export class LogoutButtonComponent {

  constructor(private userSvc: UserService){}

  logout(){
    this.userSvc.logout();
  }
}
