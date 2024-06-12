import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.css']
})
export class LogoutButtonComponent {

  constructor(private userSvc: UserService,
    private router: Router
  ){}

  logout(){
    this.router.navigate(['listManager']);
    this.userSvc.logout();
  }
}
