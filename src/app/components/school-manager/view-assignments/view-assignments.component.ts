import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Assignment } from 'src/app/common/school-manager/assignment';
import { StudentListDto } from 'src/app/common/school-manager/student-list-dto';
import { UserDto } from 'src/app/common/school-manager/user-dto';
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
  @Output() 
  assignmentList: Assignment[] = [];
  // homeworkList: Assignment[] = [];
  // @Output() listChangeEmit = new EventEmitter<Assignment>();
  // quizList: Assignment[] = [];
  roleView: string = "";
  // private selectedAssignments: Assignment[] = [];
  tchrShowAssignmentList: boolean = true;
  tchrShowCourseList: boolean = false;
  tchrShowStudentList: boolean = false;
  selectedStudentsList: UserDto[] = [];
  courseDTOList: StudentListDto[] = [];
  teacherId: number = 0;
  // testList: Assignment[] = [];

  testListShow: boolean = true;

  //look at passing teacherId from the userPage instead of injecting the UserService 
  public constructor(
    private assignSvc: AssignmentService,
    public smUserSvc: UserService, 
    private staffSvc: StaffService){}

  ngOnInit(): void {
    this.teacherId = this.smUserSvc.getLoggedInUserId();
    this.roleView = this.smUserSvc.getLoggedInUserRoleView();
    if(this.teacherId != -1){
      // this.getAssignments();
      this.staffSvc.getStudentsByTeacherId(this.teacherId).subscribe(
        response =>{
          this.courseDTOList = response;
          this.sortCourses();
        }
      )
    }
  }

  showCourseSelect(){
    this.tchrShowAssignmentList = false;
    this.tchrShowCourseList = true;
  }

  sortCourses(){
    this.courseDTOList.sort((a,b) => {
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