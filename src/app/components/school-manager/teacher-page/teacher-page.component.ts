import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SchoolManagerService } from 'src/app/service/school-manager/school-manager.service';

@Component({
  selector: 'app-teacher-page',
  templateUrl: './teacher-page.component.html',
  styleUrls: ['./teacher-page.component.css']
})
export class TeacherPageComponent implements OnInit{
  viewTab='home';
  userRole: string = '';

  constructor(public smSvc: SchoolManagerService,
    private router: Router){}

  ngOnInit(): void {
    if(this.smSvc.roleView=='main') this.router.navigate(['/schoolManager/main']);
  }

  logout(){
    this.smSvc.logout();
  }

  setTabView(view: string){
    this.viewTab = view;
  }
}