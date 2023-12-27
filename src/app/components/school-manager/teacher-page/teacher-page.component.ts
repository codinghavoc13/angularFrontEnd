import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { User } from 'src/app/common/school-manager/user';
import { SchoolManagerService } from 'src/app/service/school-manager/school-manager.service';

@Component({
  selector: 'app-teacher-page',
  templateUrl: './teacher-page.component.html',
  styleUrls: ['./teacher-page.component.css']
})
export class TeacherPageComponent implements OnInit{
  viewTab='home';
  tp_teacher_id: number = 0;

  constructor(public smSvc: SchoolManagerService,
    private router: Router){}

  ngOnInit(): void {
    if (!this.smSvc.currentUser$){
      this.router.navigate(['/schoolManager/main']);
    } else {
      // this.tp_teacher_id = this.smSvc.user_id;
      this.tp_teacher_id = this.smSvc.loggedInUser!.userId;
      console.log('tp-1');
      console.log(this.tp_teacher_id);
    }
  }

  logout(){
    this.smSvc.logout();
  }

  setTabView(view: string){
    this.viewTab = view;
  }
}