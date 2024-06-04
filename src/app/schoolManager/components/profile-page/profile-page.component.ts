import { Component } from '@angular/core';
import { SchoolManagerService } from 'src/app/schoolManager/service/school-manager.service';
import { UserService } from 'src/app/schoolManager/service/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {

  constructor(public smUserSvc: UserService){
    
  }

}
