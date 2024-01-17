import { Component, Input, OnInit } from '@angular/core';
import { StudentListDto } from 'src/app/common/school-manager/student-list-dto';
import { UserDto } from 'src/app/common/school-manager/user-dto';
import { StaffService } from 'src/app/service/school-manager/staff.service';
import { UserService } from 'src/app/service/school-manager/user.service';

@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.css']
})
export class ViewStudentsComponent implements OnInit{
  students: UserDto[] = [];
  studentList: StudentListDto[] = [];
  ascDesc: boolean = true;
  count = 0;
  role: String = '';

  constructor(private smUserSvc: UserService, private staffSvc: StaffService){}

  ngOnInit(): void {
    // this.parent_id = this.smUserSvc.loggedInUser?.userId;
    //rework this to call a different userSvc method based on loggedInUser role
    console.log(this.smUserSvc.loggedInUser!.role);
    this.role = this.smUserSvc.loggedInUser!.role;
    // if(this.smUserSvc.loggedInUser!.role == 'ADMIN'){
    //   this.smUserSvc.getUsersByRole('STUDENT').subscribe(
    //     response=>{
    //       this.students = response;
    //       console.log(this.students.length);
    //     }
    //   )
    // }
    this.retrieveStudents();
  }
  
  retrieveStudents(){
    if(this.smUserSvc.loggedInUser!.role == 'ADMIN'){
      this.smUserSvc.getUsersByRole('STUDENT').subscribe(
        response=>{
          this.students = response;
          this.count = this.students.length;
        }
      )
    }
    if(this.smUserSvc.loggedInUser!.role =='TEACHER'){
      this.staffSvc.getStudentsByTeacherId(this.smUserSvc.loggedInUser!.userId).subscribe(
        response =>{
          this.studentList = response;
          console.log(this.studentList);
        }
      )
    }
  }
}
