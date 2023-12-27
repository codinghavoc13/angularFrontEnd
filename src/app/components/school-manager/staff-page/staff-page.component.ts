import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/school-manager/user';
import { SchoolManagerService } from 'src/app/service/school-manager/school-manager.service';

@Component({
  selector: 'app-staff-page',
  templateUrl: './staff-page.component.html',
  styleUrls: ['./staff-page.component.css']
})
export class StaffPageComponent implements OnInit{
  public loggedInUser: User | undefined;

  constructor(private smSvc: SchoolManagerService){}

  ngOnInit(): void {
    // this.loggedInUser = this.smSvc.userTgt;
    // console.log('sp-oninit-1');
    // console.log(this.loggedInUser?.firstname);
    // console.log('sp-oninit-2');
    // console.log(this.smSvc.currentUser$.subscribe(
    //   data=>{
    //     console.log('sp-oninit-4');
    //     console.log(data);
    //     this.loggedInUser = data as User;
    //   }
    // ));
    this.loggedInUser = this.smSvc.userTgt as User;
    // this.smSvc.currentUser$.subscribe(
    //   data=>{
    //     console.log('sp-oninit-4');
    //     console.log(data?.firstname);
    //     console.log('sp-oninit-5');
    //     console.log(data);
    //     this.loggedInUser = data as User;
    //   }
    // )
    console.log('sp-oninit-3');
    console.log(this.loggedInUser);
  }

  logout(){
    this.smSvc.logout();
  }
}
