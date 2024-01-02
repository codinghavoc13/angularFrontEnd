import { Component } from '@angular/core';
import { SchoolManagerService } from 'src/app/service/school-manager/school-manager.service';
import { UserService } from 'src/app/service/school-manager/user.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent {
  constructor(public smUserSvc: UserService) { }

  logout(){
    this.smUserSvc.logout();
  }
}
