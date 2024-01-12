import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/school-manager/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit{
  viewTab='home';
  userRole: string = '';
  userVerification: boolean = true;

  constructor(public smUserSvc: UserService,
    private router: Router){

  }
  ngOnInit(): void {
    if(this.smUserSvc.roleView=='main') {
      this.router.navigate(['/schoolManager/main']);
    } else {
      this.userRole = this.smUserSvc.loggedInUser!.role;
      this.userVerification = this.smUserSvc.loggedInUser!.verified;
    }
  }

  logout(){
    this.smUserSvc.logout();
  }

  setTabView(view: string){
    this.viewTab = view;
  }
}
