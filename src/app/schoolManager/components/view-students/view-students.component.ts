import { Component, OnInit } from '@angular/core';
import { StudentListDto } from '../../common/student-list-dto';
import { UserDto } from '../../common/user-dto';
import { StaffService } from '../../service/staff.service';
import { TeacherService } from '../../service/teacher.service';
import { UserService } from '../../service/user.service';
import { MainModule } from '../../../main/module/main/main.module';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewStudentsSubComponent } from '../view-students-sub/view-students-sub.component';

@Component({
  selector: 'app-view-students',
  standalone: true,
  imports: [
    MainModule,
    NgbAccordionModule,
    ViewStudentsSubComponent
  ],
  templateUrl: './view-students.component.html',
  styleUrl: './view-students.component.css'
})
export class ViewStudentsComponent implements OnInit{
  students: UserDto[] = [];
  studentList: StudentListDto[] = [];
  ascDesc: boolean = true;
  count = 0;
  role: String = '';
  teacherId: number = 0;

  constructor(private smUserSvc: UserService, private staffSvc: StaffService,
    private teacherSvc: TeacherService){}

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
      this.teacherSvc.getStudentsByTeacherId(this.teacherId).subscribe(
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
