import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/common/school-manager/user';
import { UserService } from 'src/app/service/school-manager/user.service';

@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.css']
})
export class ViewStudentsComponent implements OnInit{
  students: User[] = [];
  // parent_id: number = 0;

  constructor(private smUserSvc: UserService){}

  ngOnInit(): void {
    // this.parent_id = this.smUserSvc.loggedInUser?.userId;
    this.smUserSvc.getStudentsByParentId(this.smUserSvc.loggedInUser!.userId).subscribe(
      data=>{
        console.log(data);
        this.students = data;
      }
    )
  }

}
