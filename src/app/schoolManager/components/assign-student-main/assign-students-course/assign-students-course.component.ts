import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AssignStudentDto } from 'src/app/schoolManager/common/assign-student-dto';
import { CourseDetailDto } from 'src/app/schoolManager/common/course-detail-dto';
import { CPTDto } from 'src/app/schoolManager/common/cpt-dto';
import { StudentDetailDto } from 'src/app/schoolManager/common/student-detail-dto';
import { StaffService } from 'src/app/schoolManager/service/staff.service';

@Component({
  selector: 'app-assign-students-course',
  templateUrl: './assign-students-course.component.html',
  styleUrls: ['./assign-students-course.component.css']
})
export class AssignStudentsCourseComponent implements OnInit{
  courseDetail: CourseDetailDto | undefined;
  courseList: CourseDetailDto[] = [];
  courseListDisplay: CourseDetailDto[] = [];
  courseSelect: number = 0;
  grades: string[] = ['K','1','2','3','4','5','6'];
  gradeSelect: string = '';
  showCourseTable: boolean = true;
  studentList: StudentDetailDto[] = [];
  showConfirmTable: boolean = false;
  showSelectTable: boolean = false;
  tempStudentList: StudentDetailDto[] = [];
  workingList: StudentDetailDto[] = [];

  constructor(private staffSvc: StaffService, private toastr: ToastrService){}
  
  ngOnInit(): void {
    console.log('Loading students->course');
    this.buildCourseList();
    this.buildTempStudentList();
  }

  //add logic to replicate the assignment select for teachers to remove students from
  //the display once they have been selected and add to a separate list
  addStudentToWorkingList(student: StudentDetailDto){
    this.workingList.push(student);
  }

  async buildCourseList(){
    //need to create two service methods: one to only get courses with a period of -1 (no period) 
    //and one to get courses with a period greater than or equal to 0 (homeroom = 0)
    await this.staffSvc.getCourseDetails('elementary').subscribe(
      response => {
        response.forEach((cd) => {
          this.courseList.push(cd);
        })
      }
    )
    // console.log(this.courseList);
  }

  buildStudentList(){
    this.studentList = [];
    this.tempStudentList.filter((dto)=>{
      if(dto.student.gradeLevel == this.gradeSelect?.toString()) this.studentList.push(dto);
    })
    if(this.studentList.length == 0){
      this.toastr.warning('No students in that grade found that are not enrolled in a course');
    } else {
      this.toastr.success('Student list populated');
    }
    this.courseListDisplay = [];
    this.courseList.filter((course)=>{
      if(course.courseName[0] == this.gradeSelect!.toString()){
        this.courseListDisplay.push(course);
      };
    })
  }

  buildTempStudentList(){
    this.staffSvc.getStudentsNotAssignedToTeacher().subscribe(
      data=>{
        this.tempStudentList = data;
      }
    )
  }

  checkWorkingList(student: StudentDetailDto){
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
    console.log('asc-ra-1');
    this.workingList = [];
  }

  removeCourseSelect(){
    this.courseSelect = 0;
  }

  removeFromWorkingList(student: StudentDetailDto){
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
    console.log('asc-sa-1');
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
    this.workingList.forEach((dto)=>{
      student_ids_temp.push(dto.student.userId);
    })
    this.workingList = [];
    let cpt: CPTDto = new CPTDto(this.courseSelect,this.courseDetail!.teacherId,this.courseDetail!.period);
    let assignStudentDto: AssignStudentDto = new AssignStudentDto();
    assignStudentDto.cptIds.push(this.courseDetail!.cptId);
    assignStudentDto.studentIds = student_ids_temp;
    //Need to modify this to send the cptId
    this.staffSvc.submitStudentAssignmentDto(assignStudentDto).subscribe(
      response =>{
        this.tempStudentList = [];
        this.buildTempStudentList();
        this.showCourseTable = true;
        this.showSelectTable = false;
        this.showConfirmTable = false;
        this.courseSelect = 0;
        this.gradeSelect = '';
      }
    )
  }

}
