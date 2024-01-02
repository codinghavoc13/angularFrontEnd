import { Component } from '@angular/core';
import { SchoolManagerService } from 'src/app/service/school-manager/school-manager.service';
import { UserService } from 'src/app/service/school-manager/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {

  constructor(public smUserSvc: UserService){
    
  }

}
