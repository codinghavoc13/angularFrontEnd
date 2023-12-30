import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/common/school-manager/user';
import { SchoolManagerService } from 'src/app/service/school-manager/school-manager.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit{
  viewTab='home';
  userRole: string = '';

  constructor(public smSvc: SchoolManagerService,
    private router: Router){

  }
  ngOnInit(): void {
    // this.pageView = this.smSvc.roleView;
    // if(this.pageView == 'main' || this.pageView == ''){
    //   this.router.navigate(['/schoolManager/main']);
    // }
    if(this.smSvc.roleView=='main') {
      this.router.navigate(['/schoolManager/main']);
    } else {
      this.userRole = this.smSvc.loggedInUser!.role;
      console.log(this.userRole);
    }
  }

  // setViewPage(view: string){
  //   this.pageView = view;
  // }

  logout(){
    this.smSvc.logout();
  }

  setTabView(view: string){
    this.viewTab = view;
  }
}
