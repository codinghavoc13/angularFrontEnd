import { Component } from '@angular/core';
import { UserService } from 'src/app/schoolManager/service/user.service';

@Component({
  selector: 'app-school-manager-main',
  templateUrl: './school-manager-main.component.html',
  styleUrls: ['./school-manager-main.component.css']
})
export class SMMainComponent {
  constructor(public smUserSvc: UserService){}

  logout(){
    this.smUserSvc.logout();
  }

}
