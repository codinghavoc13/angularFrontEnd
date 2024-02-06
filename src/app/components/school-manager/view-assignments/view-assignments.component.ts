import { Component, OnInit } from '@angular/core';
import { Assignment } from 'src/app/common/school-manager/assignment';
import { StudentListDto } from 'src/app/common/school-manager/student-list-dto';
import { AssignmentService } from 'src/app/service/school-manager/assignment.service';
import { StaffService } from 'src/app/service/school-manager/staff.service';
import { UserService } from 'src/app/service/school-manager/user.service';

@Component({
  selector: 'app-view-assignments',
  templateUrl: './view-assignments.component.html',
  styleUrls: ['./view-assignments.component.css']
})
/**
 * Need to update this to get the list of students assigned to course/teacher
 */
export class ViewAssignmentsComponent implements OnInit{
  homeworkList: Assignment[] = [];
  quizList: Assignment[] = [];
  studentList: StudentListDto[] = [];
  teacherId: number = 0;
  testList: Assignment[] = [];

  //look at passing teacherId from the userPage instead of injecting the UserService 
  public constructor(
    private assignSvc: AssignmentService,
    public smUserSvc: UserService, 
    private staffSvc: StaffService){}

  ngOnInit(): void {
    this.teacherId = this.smUserSvc.loggedInUser!.userId;
    this.assignSvc.getAssignmentsByTeacherId(this.smUserSvc.loggedInUser!.userId).subscribe(
      response =>{
        response.forEach((a)=>{
          if(a.assignmentType=='HOMEWORK') this.homeworkList.push(a);
          if(a.assignmentType=='QUIZ') this.quizList.push(a);
          if(a.assignmentType=='TEST') this.testList.push(a);
        })
      }
    )
    this.staffSvc.getStudentsByTeacherId(this.teacherId).subscribe(
      response =>{
        this.studentList = response;
        this.sortCourses();
      }
    )
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
}