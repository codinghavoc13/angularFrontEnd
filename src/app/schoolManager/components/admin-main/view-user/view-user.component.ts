import { Component, OnInit } from '@angular/core';
import { UserDto } from '../../../common/user-dto';
import { UserService } from '../../../service/user.service';
import { ViewUserTableComponent } from '../view-user-table/view-user-table.component';

@Component({
  selector: 'app-view-user',
  standalone: true,
  imports: [
    ViewUserTableComponent
  ],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css'
})
export class ViewUserComponent implements OnInit{
  allUsers: UserDto[] = [];
  studentList: UserDto[] = [];
  parentList: UserDto[] = [];
  teacherList: UserDto[] = [];
  adminList: UserDto[] = [];

  public constructor(public smUserSvc: UserService){}

  ngOnInit(): void {
    this.smUserSvc.getAllUsers().subscribe(
      response => {
        console.log('vu-1');
        console.log(response);
        response.forEach((u)=>{
          if(u.role=='STUDENT') this.studentList.push(u);
          if(u.role=='PARENT' || u.role=='PRIMARY') this.parentList.push(u);
          if(u.role=='TEACHER') this.teacherList.push(u);
          if(u.role=='ADMIN') this.adminList.push(u);
        })
      }
    )    
  }
}
