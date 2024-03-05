import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { ToastrService } from 'ngx-toastr';
import { Assignment } from 'src/app/common/school-manager/assignment';
import { GradeEntryDTO } from 'src/app/common/school-manager/grade-entry-dto';
import { StudentListDto } from 'src/app/common/school-manager/student-list-dto';
import { UserDto } from 'src/app/common/school-manager/user-dto';
import { StaffService } from 'src/app/service/school-manager/staff.service';
import { TeacherService } from 'src/app/service/school-manager/teacher.service';
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
  selectedAssignments: Assignment[] = [];
  selectedCourses: number [] = [];
  selectedStudentsList: UserDto[] = [];
  studentCptIdList: StudentCPTPair[] = [];
  tchrShowAssignmentList: boolean = true;
  tchrShowConfirm: boolean = false;
  tchrShowCourseList: boolean = false;
  tchrShowStudentList: boolean = false;
  courseDTOList: StudentListDto[] = [];
  teacherId: number = 0;

  testListShow: boolean = true;

  //look at passing teacherId from the userPage instead of injecting the UserService 
  public constructor(
    public smUserSvc: UserService, 
    private staffSvc: StaffService,
    private teacherSvc: TeacherService,
    private toastr: ToastrService){}

  ngOnInit(): void {
    this.teacherId = this.smUserSvc.getLoggedInUserId();
    this.roleView = this.smUserSvc.getLoggedInUserRoleView();
    if(this.teacherId != -1){
      // this.getAssignments();
      this.teacherSvc.getStudentsByTeacherId(this.teacherId).subscribe(
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

  deselectAllCourses(){
    this.selectedCourses = [];
  }

  isCourseSelected(cptID: number){
    return this.selectedCourses.includes(cptID);
  }

  isStudentSelected(student: UserDto){
    return this.selectedStudentsList.includes(student);
  }

  moveToConfirm(){
    this.tchrShowConfirm = true;
    this.tchrShowStudentList = false;
  }

  removeAssignment(assignment: Assignment){
    let temp:Assignment[] = [];
    this.selectedAssignments.forEach((a)=>{
      if(a != assignment) temp.push(a);
    })
    this.selectedAssignments = temp;
    this.sortSelectedAssignments();
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

  removeStudent(student: UserDto){
    let temp:UserDto[] = [];
    this.selectedStudentsList.forEach((s)=>{
      if(s != student) temp.push(s);
    })
    this.selectedStudentsList = temp;
    this.sortSelectedStudents();
  }

  selectAllCourses(){
    this.courseDTOList.forEach((c)=>{
      this.selectedCourses.push(c.cptId);
    })
  }

  selectCourse(cptID: number){
    this.selectedCourses.push(cptID);
    console.log(this.selectedCourses);
  }

  selectStudent(student: UserDto, studentId: number, cptId: number){
    if(!this.selectedStudentsList.includes(student)){
      this.selectedStudentsList.push(student)
    }
    this.sortSelectedStudents();
    this.studentCptIdList.push(new StudentCPTPair(studentId, cptId));
  }

  showCourseSelect(incoming: Assignment[]){
    incoming.forEach((a)=>{
      this.selectedAssignments.push(a)
    });
    this.sortSelectedAssignments();
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

  sortSelectedAssignments(){
    this.selectedAssignments.sort((a,b)=>{
      if(a.assignmentDueDate < b.assignmentDueDate) return -1;
      if(a.assignmentDueDate > b.assignmentDueDate) return 1;
      return 0;
    })
  }

  sortSelectedStudents(){
    this.selectedStudentsList.sort((a,b)=>{
      if (a.lastName < b.lastName) return -1;
      if (a.lastName > b.lastName) return 1;
      if (a.firstName < b.firstName) return -1;
      if (a.firstName > b.firstName) return 1;
      return 0;
    })
  }

  submit(){
    this.gradeEntryList = [];
    this.selectedAssignments.forEach((a) => {
      this.studentCptIdList.forEach((sc)=>{
        this.gradeEntryList.push(new GradeEntryDTO(sc.studentId,sc.cptId,a.assignmentId))
      })
    })
    // console.log(this.selectedAssignments);
    // this.selectedAssignments.forEach((a)=>{
    //   this.gradeEntryList.push(new GradeEntryDTO(studentId,cptId,a.assignmentId))
    // })
    console.log(this.gradeEntryList);
    this.teacherSvc.submitInitialGradeEntries(this.gradeEntryList).subscribe(
      response=>{
        console.log('submitted');
        this.toastr.success("Successfully saved " + response.length + " new entries");
      }
    );
  }
}

class StudentCPTPair{
  constructor(
    public studentId: number,
    public cptId: number){}
}