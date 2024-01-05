import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/school-manager/user';
import { UserService } from 'src/app/service/school-manager/user.service';

@Component({
  selector: 'app-assign-student',
  templateUrl: './assign-student.component.html',
  styleUrls: ['./assign-student.component.css']
})
export class AssignStudentComponent implements OnInit{
  tempStudentList: User[] = [];
  studentList: User[] = [];
  teacherList: User[] = [];
  gradeSelect: number | undefined;

  constructor(private smUserSvc: UserService){}
  
  ngOnInit(): void {
    this.buildTeacherList();
    this.sortTeachers();
    this.buildTempStudentList();
  }

  async buildTeacherList(){
    await this.smUserSvc.getUsersByRole('TEACHER').subscribe(
      response => {
        response.forEach((u) =>{
          this.teacherList.push(u);
        })
      }
    )
  }

  sortTeachers(){
    this.teacherList.sort((a, b) => a.lastName.localeCompare(b.lastName));
  }

  buildTempStudentList(){
    this.smUserSvc.getStudentsNotAssignedToTeacher().subscribe(
      data=>{
        this.tempStudentList = data;
      }
    )
  }

  buildStudentList(){
    this.studentList = [];
    this.tempStudentList.filter((student)=>{
      if(student.gradeLevel == this.gradeSelect?.toString()) this.studentList.push(student);
    })
  }
}
