import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/school-manager/user';
import { SchoolManagerService } from 'src/app/service/school-manager/school-manager.service';

@Component({
  selector: 'app-staff-page',
  templateUrl: './staff-page.component.html',
  styleUrls: ['./staff-page.component.css']
})
export class StaffPageComponent implements OnInit{
  loggedInUser: User | undefined;

  constructor(private smSvc: SchoolManagerService){}

  ngOnInit(): void {
    // this.loggedInUser = this.smSvc.userTgt;
    // console.log(this.loggedInUser?.firstname);
    // console.log(this.smSvc.currentUser$.subscribe(
    //   data=>{
    //     this.loggedInUser = data!;
    //   }
    // ));
    // console.log(this.loggedInUser?.firstname);
  }

  logout(){
    this.smSvc.logout();
  }
}
