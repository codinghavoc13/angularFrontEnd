import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Assignment } from 'src/app/common/school-manager/assignment';
import { CourseDetailDto } from 'src/app/common/school-manager/course-detail-dto';
import { GradeEntryDTO } from 'src/app/common/school-manager/grade-entry-dto';
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
  // assignmentList: Assignment[] = [];
  displayList: StudentListDto[] = [];
  gradeEntryList: GradeEntryDTO[] = [];
  roleView: string = "";
  selectedAssignments: number[] = [];
  selectedCourses: number [] = [];
  tchrShowAssignmentList: boolean = true;
  tchrShowCourseList: boolean = false;
  tchrShowStudentList: boolean = false;
  selectedStudentsList: UserDto[] = [];
  courseDTOList: StudentListDto[] = [];
  teacherId: number = 0;

  testListShow: boolean = true;

  //look at passing teacherId from the userPage instead of injecting the UserService 
  public constructor(
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
          // console.log(this.courseDTOList);
          this.sortCourses();
        }
      )
    }
  }

  buildPeriodBlockString(dto: StudentListDto){
    let result: string = "";
    result = dto.period.toString();
    if(dto.course.courseBlock=='FALL_SEMESTER'){
      result += ' - Fall Semester';
    }
    if(dto.course.courseBlock=='SPRING_SEMESTER'){
      result += ' - Spring Semester';
    }
    return result;
  }

  isCourseSelected(cptID: number){
    return this.selectedCourses.includes(cptID);
  }

  removeCourse(cptID: number){
    console.log(cptID);
    let temp: number[] = [];
    this.selectedCourses.forEach((c)=>{
      if(c!=cptID){
        temp.push(c);
      }
    })
    this.selectedCourses = temp;
  }

  selectCourse(cptID: number){
    this.selectedCourses.push(cptID);
    console.log(this.selectedCourses);
  }

  selectStudent(studentId: number, cptId: number){
    this.selectedAssignments.forEach((a)=>{
      this.gradeEntryList.push(new GradeEntryDTO(studentId,cptId,a))
    })
    console.log(this.gradeEntryList);
  }

  showCourseSelect(incoming: Assignment[]){
    incoming.forEach((a)=>{
      this.selectedAssignments.push(a.assignmentId)
    })
    console.log(this.selectedAssignments);
    // this.assignmentList = incoming;
    // console.log(this.assignmentList);
    this.tchrShowAssignmentList = false;
    this.tchrShowCourseList = true;
  }

  showStudentSelect(){
    this.tchrShowStudentList = true;
    this.tchrShowCourseList = false;
    console.log(this.courseDTOList);
    this.courseDTOList.forEach((dto)=>{
      if(this.selectedCourses.includes(dto.cptId) && dto.students.length>0){
        this.displayList.push(dto);
      }
    })
    console.log(this.displayList);
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