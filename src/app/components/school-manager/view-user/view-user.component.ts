import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/school-manager/user';
import { UserService } from 'src/app/service/school-manager/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit{
  allUsers: User[] = [];
  studentList: User[] = [];
  parentList: User[] = [];
  teacherList: User[] = [];
  adminList: User[] = [];

  public constructor(public smUserSvc: UserService){}

  ngOnInit(): void {
    this.smUserSvc.getAllUsers().subscribe(
      response => {
        console.log('vu-1');
        console.log(response);
        response.forEach((u)=>{
          if(u.role=='STUDENT') this.studentList.push(u);
          if(u.role=='PARENT') this.parentList.push(u);
          if(u.role=='TEACHER') this.teacherList.push(u);
          if(u.role=='ADMIN') this.adminList.push(u);
        })
      }
    )    
  }


}
