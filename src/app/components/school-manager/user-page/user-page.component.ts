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
  pageView: string = '';
  loggedInUser: User | undefined;

  constructor(private smSvc: SchoolManagerService,
    private router: Router){

  }
  ngOnInit(): void {
    this.pageView = this.smSvc.roleView;
    if(this.pageView == 'main' || this.pageView == ''){
      this.router.navigate(['/schoolManager/main']);
    }
    // this.smSvc.currentUser$.subscribe(
    //   data=>{
    //     console.log('up-oninit-1');
    //     console.log(data);
    //     this.loggedInUser = data as User;
    //   }
    // )
    // console.log('up-oninit-2');
    // console.log(this.loggedInUser);
  }

  setViewPage(view: string){
    this.pageView = view;
  }
}
