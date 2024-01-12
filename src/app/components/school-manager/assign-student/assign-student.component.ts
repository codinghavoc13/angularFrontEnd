import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AssignStudentDto } from 'src/app/common/school-manager/assign-student-dto';
import { CourseDetailDto } from 'src/app/common/school-manager/course-detail-dto';
import { UserDto } from 'src/app/common/school-manager/user-dto';
// import { User } from 'src/app/common/school-manager/user';
import { StaffService } from 'src/app/service/school-manager/staff.service';
import { UserService } from 'src/app/service/school-manager/user.service';

@Component({
  selector: 'app-assign-student',
  templateUrl: './assign-student.component.html',
  styleUrls: ['./assign-student.component.css']
})
export class AssignStudentComponent implements OnInit{
  tempStudentList: UserDto[] = [];
  studentList: UserDto[] = [];
  teacherList: UserDto[] = [];
  
  workingList: UserDto[] = [];
  //This will need to be looked at before moving forward with the new changes to the backend
  courseList: CourseDetailDto[] = [];
  showCourseTable: boolean = true;
  showSelectTable: boolean = false;
  showConfirmTable: boolean = false;

  gradeSelect: string = '';
  courseSelect: number = 0;
  courseDetail: CourseDetailDto | undefined;
  selMultiStudent: boolean = true;
  selMultiTeacher: boolean = false;

  constructor(private smUserSvc: UserService,
    private toastr: ToastrService,
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
    if(this.studentList.length == 0){
      this.toastr.warning('No students in that grade found that are not enrolled in a course');
    } else {
      this.toastr.success('Student list populated');
    }
  }

  submit(){
    let student_ids_temp: number [] = [];
    this.workingList.forEach((student)=>{
      student_ids_temp.push(student.userId);
    })
    this.workingList = [];
    let assignStudentDto: AssignStudentDto = new AssignStudentDto(
      this.courseSelect,
      student_ids_temp
    );
    console.log(assignStudentDto);
    this.staffSvc.submitStudentAssignmentDto(assignStudentDto).subscribe(
      response =>{
        //need to update the this.tempStudentList, either pull it down fresh or filter out the ones that match student_ids_temp
        this.tempStudentList = [];
        this.buildTempStudentList();
        //reset the show flags to take the user back to course select
        this.showCourseTable = true;
        this.showSelectTable = false;
        this.showConfirmTable = false;
        this.courseSelect = 0;
        this.gradeSelect = '';
      }
    )
  }

  addStudentToWorkingList(student: UserDto){
    this.workingList.push(student);
  }

  removeFromWorkingList(student: UserDto){
    const idx = this.workingList.indexOf(student);
    if(idx > -1){
      this.workingList.splice(idx,1);
    }
  }

  checkWorkingList(student: UserDto){
    return this.workingList.includes(student);
  }

  moveToConfirm(){
    this.showCourseTable = false;
    this.showSelectTable = false;
    this.showConfirmTable = true;
  }

  moveToSelect(){
    this.showCourseTable = false;
    this.showSelectTable = true;
    this.showConfirmTable = false;
  }

  returnToCourseSelect(){
    this.showCourseTable = true;
    this.showSelectTable = false;
    this.showConfirmTable = false;
  }

  returnToStudentSelect(){
    this.showCourseTable = false;
    this.showSelectTable = true;
    this.showConfirmTable = false;
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
