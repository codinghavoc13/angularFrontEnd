import { Component, OnInit } from '@angular/core';
import { SchoolManagerService } from 'src/app/service/school-manager/school-manager.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit{
  pageView: string = '';

  constructor(private smSvc: SchoolManagerService){

  }
  ngOnInit(): void {
    this.pageView = this.smSvc.roleView;
  }

  setViewPage(view: string){
    this.pageView = view;
  }
}
