import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/common/school-manager/user';
import { SchoolManagerService } from 'src/app/service/school-manager/school-manager.service';
import { UserService } from 'src/app/service/school-manager/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit{
  viewTab='home';
  userRole: string = '';

  constructor(public smUserSvc: UserService,
    private router: Router){

  }
  ngOnInit(): void {
    // this.pageView = this.smSvc.roleView;
    // if(this.pageView == 'main' || this.pageView == ''){
    //   this.router.navigate(['/schoolManager/main']);
    // }
    if(this.smUserSvc.roleView=='main') {
      this.router.navigate(['/schoolManager/main']);
    } else {
      this.userRole = this.smUserSvc.loggedInUser!.role;
      console.log('up-1');
      console.log(this.userRole);
    }
  }

  // setViewPage(view: string){
  //   this.pageView = view;
  // }

  logout(){
    this.smUserSvc.logout();
  }

  setTabView(view: string){
    this.viewTab = view;
  }
}
