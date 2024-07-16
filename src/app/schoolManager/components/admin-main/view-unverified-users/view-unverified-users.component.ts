import { Component, OnInit } from '@angular/core';
import { UserDto } from '../../../common/user-dto';
import { StaffService } from '../../../service/staff.service';
import { UserService } from '../../../service/user.service';
import { CommonModule } from '@angular/common';
import { ViewUserTableComponent } from '../view-user-table/view-user-table.component';

@Component({
  selector: 'app-view-unverified-users',
  standalone: true,
  imports: [
    CommonModule,
    ViewUserTableComponent
  ],
  templateUrl: './view-unverified-users.component.html',
  styleUrl: './view-unverified-users.component.css'
})
export class ViewUnverifiedUsersComponent implements OnInit{
  studentList: UserDto[] = [];
  parentList: UserDto[] = [];
  userIdToVerify: number = 0;

  constructor(private smUserSvc: UserService, private staffSvc: StaffService){}

  ngOnInit(): void {
    this.buildLists();
  }

  buildLists(){
    this.staffSvc.getUnverifiedUsers().subscribe(
      response => {
        response.forEach((u)=>{
          if(u.role=='STUDENT') this.studentList.push(u);
          if(u.role=='PARENT' || u.role=='PRIMARY') this.parentList.push(u);
        })
      }
    )
  }

  async verifyUser(userId: number, list: string){
    await this.staffSvc.verifyUser(userId);
    if(list=='student'){
      this.studentList = this.studentList.filter(function(user){
        return user.userId !== userId;
      })
    }
    if(list=='parent'){
      this.parentList = this.parentList.filter(function(user){
        return user.userId !== userId;
      })
    }
  }

  refresh(){
    this.buildLists();
  }
}
