import { Component, Input, OnInit } from '@angular/core';
import { CourseDetailDto } from 'src/app/common/school-manager/course-detail-dto';
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
  teacherId: number = 0;

  constructor(private smUserSvc: UserService, private staffSvc: StaffService){}

  ngOnInit(): void {
    this.role = this.smUserSvc.getLoggedInUserRole()
    this.teacherId = this.smUserSvc.getLoggedInUserId();
    this.retrieveStudents();
  }
  
  retrieveStudents(){
    //update the if statements to use this.role instead of this.smUser...
    if(this.role == 'ADMIN'){
      this.smUserSvc.getUsersByRole('STUDENT').subscribe(
        response=>{
          this.students = response;
          this.count = this.students.length;
        }
      )
    }
    if(this.role =='TEACHER'){
      this.staffSvc.getStudentsByTeacherId(this.teacherId).subscribe(
        response =>{
          this.studentList = response;
          this.sortCourses();
        }
      )
    }
  }

  sortCourses(){
    this.studentList.sort((a,b) => {
      //sort by period
      if (a.period < b.period) return -1;
      if (a.period > b.period) return 1;
      //sort by courseName
      if (a.course.courseName < b.course.courseName) return -1;
      if (a.course.courseName > b.course.courseName) return 1;
      //sort by courseBlock
      if (a.course.courseBlock < b.course.courseBlock) return -1;
      if (a.course.courseBlock > b.course.courseBlock) return 1;
      return 0;
    })
  }

  courseToString(dto: StudentListDto){
    let result = "";
    result = dto.course.courseName + " - ";
    result += dto.period + " - ";
    if(dto.course.credit==0.5){
      if(dto.course.courseBlock=="FALL_SEMESTER"){
        result += "Fall Semester - ";
      }
      if(dto.course.courseBlock=="SPRING_SEMESTER"){
        result += "Spring Semester - ";
      }
    }
    result += dto.students.length + " enrolled"
    return result;
  }
}
