import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AssignStudentDto } from 'src/app/common/school-manager/assign-student-dto';
import { CourseDetailDto } from 'src/app/common/school-manager/course-detail-dto';
import { User } from 'src/app/common/school-manager/user';
import { StaffService } from 'src/app/service/school-manager/staff.service';
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
  
  workingList: User[] = [];
  courseList: CourseDetailDto[] = [];
  showCourseTable: boolean = true;
  showSelectTable: boolean = false;
  showConfirmTable: boolean = false;

  gradeSelect: string = '';
  courseSelect: number = 0;
  courseDetail: CourseDetailDto | undefined;
  selMultiStudent: boolean = true;
  selMultiTeacher: boolean = false;

  constructor(private smUserSvc: UserService, public fb: FormBuilder,
    private staffSvc: StaffService){
  }
  
  ngOnInit(): void {
    this.buildCourseList();
    this.buildTempStudentList();
  }

  async buildCourseList(){
    await this.staffSvc.getCourseDetails().subscribe(
      response => {
        response.forEach((cd) => {
          // console.log(cd);
          this.courseList.push(cd);
        })
      }
    )
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
    this.staffSvc.getStudentsNotAssignedToTeacher().subscribe(
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

  submit(){
    //{"gradeSelect":"4","studentSelect":[61,60],"teacherSelect":[2]}
    let student_ids_temp: number [] = [];
    this.workingList.forEach((student)=>{
      student_ids_temp.push(student.userId);
    })
    let assignStudentDto: AssignStudentDto = new AssignStudentDto(
      this.courseSelect,
      student_ids_temp
    );
    console.log(assignStudentDto);
    this.staffSvc.submitStudentAssignmentDto(assignStudentDto).subscribe(
      response =>{
        console.log(response);
      }
    )
  }

  addStudentToWorkingList(student: User){
    this.workingList.push(student);
  }

  removeFromWorkingList(student: User){
    const idx = this.workingList.indexOf(student);
    if(idx > -1){
      this.workingList.splice(idx,1);
    }
  }

  checkWorkingList(student: User){
    return this.workingList.includes(student);
  }

  moveToConfirm(){
    this.showSelectTable = false;
    this.showConfirmTable = true;
  }

  moveToSelect(){
    this.showCourseTable = false;
    this.showConfirmTable = false;
    this.showSelectTable = true;
  }

  returnToCourseSelect(){
    this.showCourseTable = true;
    this.showSelectTable = false;
  }

  returnToStudentSelect(){
    this.showConfirmTable = false;
    this.showSelectTable = true;
  }

  selectAll(){
    this.studentList.forEach((student)=>{
      if(!this.checkWorkingList(student))
        this.workingList.push(student);
    })
  }

  selectCourse(course: CourseDetailDto){
    this.courseSelect = course.courseId;
    this.courseDetail = course;
  }

  removeAll(){
    this.workingList = [];
  }

  removeCourseSelect(){
    this.courseSelect = 0;
  }
}
