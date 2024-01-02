import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/school-manager/user';
import { UserService } from 'src/app/service/school-manager/user.service';

@Component({
  selector: 'app-assign-student',
  templateUrl: './assign-student.component.html',
  styleUrls: ['./assign-student.component.css']
})
export class AssignStudentComponent implements OnInit{
  studentList: User[] = [];
  teacherList: User[] = [];

  constructor(private smUserSvc: UserService){}
  
  ngOnInit(): void {
    console.log('as-1');
    this.buildTeacherList();
    console.log('as-2');
    this.sortTeachers();
  }

  async buildTeacherList(){
    console.log('as-3');
    await this.smUserSvc.getUsersByRole('TEACHER').subscribe(
      response => {
        response.forEach((u) =>{
          this.teacherList.push(u);
        })
      }
    )
    console.log('as-4');
  }

  sortTeachers(){
    console.log('as-5');
    console.log(this.teacherList);
    this.teacherList.sort((a, b) => a.lastName.localeCompare(b.lastName));
    console.log('as-6');
    console.log(this.teacherList);
  }
}
