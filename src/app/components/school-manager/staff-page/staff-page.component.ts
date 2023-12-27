import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/school-manager/user';
import { SchoolManagerService } from 'src/app/service/school-manager/school-manager.service';

@Component({
  selector: 'app-staff-page',
  templateUrl: './staff-page.component.html',
  styleUrls: ['./staff-page.component.css']
})
export class StaffPageComponent implements OnInit{
  viewTab='home';

  constructor(public smSvc: SchoolManagerService){}

  ngOnInit(): void {
  }

  logout(){
    this.smSvc.logout();
  }

  setTabView(view: string){
    this.viewTab = view;
  }
}
