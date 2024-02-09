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
  homeworkList: Assignment[] = [];
  @Output() listChangeEmit = new EventEmitter<Assignment>();
  quizList: Assignment[] = [];
  roleView: string = "";
  private selectedAssignments: Assignment[] = [];
  tchrShowAssignmentList: boolean = true;
  tchrShowCourseList: boolean = false;
  tchrShowStudentList: boolean = false;
  selectedStudentsList: UserDto[] = [];
  courseDTOList: StudentListDto[] = [];
  teacherId: number = 0;
  testList: Assignment[] = [];

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
      this.assignSvc.getAssignmentsByTeacherId(this.teacherId).subscribe(
        response =>{
          response.forEach((a)=>{
            this.sortAssignment(a);
          })
        }
      )
      this.staffSvc.getStudentsByTeacherId(this.teacherId).subscribe(
        response =>{
          this.courseDTOList = response;
          this.sortCourses();
        }
      )
    }
  }

  addAssignment(a:Assignment){
    console.log('va-aa-1',this.testList.length);
    this.selectedAssignments.push(a);
    console.log('va-aa-2',this.testList.length);
  }

  removeAssignment(assignment: Assignment){
    console.log('va-ra-1', assignment);
    let temp: Assignment[] = [];
    this.selectedAssignments.forEach((a)=>{
      if(a != assignment){
        temp.push(a);
      }
    })
    this.selectedAssignments = temp;
    console.log('va-ra-2',this.testList);
    this.sortAssignment(assignment);
    console.log('va-ra-3',this.testList);
  }

  showCourseSelect(){
    this.tchrShowAssignmentList = false;
    this.tchrShowCourseList = true;
  }

  sortAssignment(a: Assignment){
    if(a.assignmentType=='HOMEWORK') {
      // console.log('va-sa-1');
      this.homeworkList.push(a);
    }
    if(a.assignmentType=='QUIZ')  {
      // console.log('va-sa-2');
      this.quizList.push(a);
    }
    if(a.assignmentType=='TEST')  {
      // console.log('va-sa-3');
      this.testList.forEach((b)=>{
        if(a==b){ console.log('exists')}
      })
      this.testList.push(a);
    }
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

  getSelectedAssignments(){
    return this.selectedAssignments;
  }
}