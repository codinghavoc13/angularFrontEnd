import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserDto } from 'src/app/common/school-manager/user-dto';
import { CourseDetailDto } from 'src/app/common/school-manager/course-detail-dto';
import { AssignStudentDto } from 'src/app/common/school-manager/assign-student-dto';
import { StaffService } from 'src/app/service/school-manager/staff.service';

@Component({
  selector: 'app-assign-students-course',
  templateUrl: './assign-students-course.component.html',
  styleUrls: ['./assign-students-course.component.css']
})
export class AssignStudentsCourseComponent implements OnInit{
  courseDetail: CourseDetailDto | undefined;
  courseList: CourseDetailDto[] = [];
  courseSelect: number = 0;
  gradeSelect: string = '';
  showCourseTable: boolean = true;
  studentList: UserDto[] = [];
  showConfirmTable: boolean = false;
  showSelectTable: boolean = false;
  tempStudentList: UserDto[] = [];
  workingList: UserDto[] = [];

  constructor(private staffSvc: StaffService, private toastr: ToastrService){}
  
  ngOnInit(): void {
    console.log('Loading students->course');
    this.buildCourseList();
    this.buildTempStudentList();
  }

  addStudentToWorkingList(student: UserDto){
    this.workingList.push(student);
  }

  async buildCourseList(){
    await this.staffSvc.getCourseDetails().subscribe(
      response => {
        response.forEach((cd) => {
          this.courseList.push(cd);
        })
      }
    )
    console.log(this.courseList);
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

  buildTempStudentList(){
    this.staffSvc.getStudentsNotAssignedToTeacher().subscribe(
      data=>{
        this.tempStudentList = data;
      }
    )
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

  removeAll(){
    this.workingList = [];
  }

  removeCourseSelect(){
    this.courseSelect = 0;
  }

  removeFromWorkingList(student: UserDto){
    const idx = this.workingList.indexOf(student);
    if(idx > -1){
      this.workingList.splice(idx,1);
    }
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

  submit(){
    let student_ids_temp: number [] = [];
    this.workingList.forEach((student)=>{
      student_ids_temp.push(student.userId);
    })
    this.workingList = [];
    let assignStudentDto: AssignStudentDto = new AssignStudentDto(
      this.courseSelect,
      student_ids_temp,
      this.courseDetail!.teacher_id
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

}
