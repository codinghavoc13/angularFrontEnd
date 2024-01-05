import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/school-manager/user';
import { UserService } from 'src/app/service/school-manager/user.service';

@Component({
  selector: 'app-view-unverified-users',
  templateUrl: './view-unverified-users.component.html',
  styleUrls: ['./view-unverified-users.component.css']
})
export class ViewUnverifiedUsersComponent implements OnInit{
  studentList: User[] = [];
  parentList: User[] = [];
  userIdToVerify: number = 0;

  constructor(private smUserSvc: UserService){}

  ngOnInit(): void {
    this.buildLists();
  }

  buildLists(){
    this.smUserSvc.getUnverifiedUsers().subscribe(
      response => {
        response.forEach((u)=>{
          if(u.role=='STUDENT') this.studentList.push(u);
          if(u.role=='PARENT' || u.role=='PRIMARY') this.parentList.push(u);
        })
      }
    )
  }

  async verifyUser(userId: number, list: string){
    await this.smUserSvc.verifyUser(userId);
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
