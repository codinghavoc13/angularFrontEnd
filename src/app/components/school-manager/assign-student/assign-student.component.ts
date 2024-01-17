import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AssignStudentDto } from 'src/app/common/school-manager/assign-student-dto';
import { CourseDetailDto } from 'src/app/common/school-manager/course-detail-dto';
import { UserDto } from 'src/app/common/school-manager/user-dto';
import { StaffService } from 'src/app/service/school-manager/staff.service';
import { UserService } from 'src/app/service/school-manager/user.service';

@Component({
  selector: 'app-assign-student',
  templateUrl: './assign-student.component.html',
  styleUrls: ['./assign-student.component.css']
})
export class AssignStudentComponent implements OnInit{
  teacherList: UserDto[] = [];

  manyStudentsToOneCourse: boolean = false;
  oneStudentToManyCourses: boolean = false; 

  constructor(private smUserSvc: UserService){
  }
  
  ngOnInit(): void {
  }

  showManyStudentsToOneCourse(){
    this.manyStudentsToOneCourse = true;
    this.oneStudentToManyCourses = false;
  }

  showOneStudentToManyCourses(){
    this.manyStudentsToOneCourse = false;
    this.oneStudentToManyCourses = true;
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
}
