import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AssignStudentDto } from 'src/app/common/school-manager/assign-student-dto';
import { CourseDetailDto } from 'src/app/common/school-manager/course-detail-dto';
import { StudentDetailDto } from 'src/app/common/school-manager/student-detail-dto';
import { UserDto } from 'src/app/common/school-manager/user-dto';
import { StaffService } from 'src/app/service/school-manager/staff.service';

@Component({
  selector: 'app-assign-student-courses',
  templateUrl: './assign-student-courses.component.html',
  styleUrls: ['./assign-student-courses.component.css']
})
export class AssignStudentCoursesComponent implements OnInit{
  displayCourseList: CourseDetailDto[] = [];
  filteredCourses: CourseDetailDto[] = [];
  filters: string[] = [];
  grades: string[] = ['7','8','9','10','11','12'];
  gradeSelect: string = '';
  mainCourseList: CourseDetailDto[] = [];
  originalStudentCourseList:CourseDetailDto[]=[];//this is the list that is pulled from the database
  showCourseSelect: boolean = false;
  showGradeSelect: boolean = true;
  showStudentSelectTable: boolean = false;
  showStudentSchedule: boolean = false;
  sortFlags: SortFlags = ['asc','asc','asc'];
  studentList: StudentDetailDto[] = [];
  studentSelect: StudentDetailDto | undefined;
  tempStudentList: StudentDetailDto[] = [];
  workingStudentCourseList:CourseDetailDto[]=[]; //this is the list that is displayed

  

  constructor(private staffSvc: StaffService, private toastr: ToastrService){}
  ngOnInit(): void {
    console.log('Loading student->courses');
    this.buildCourseList();
    this.buildTempStudentList();
  }

  async buildCourseList(){
    await this.staffSvc.getCourseDetails('middlehigh').subscribe(
      response => {
        response.forEach((cd) => {
          this.mainCourseList.push(cd);
        })
      }
    )
    this.mainCourseList.sort((a,b)=>a.period - b.period);
  }

  addFilter(course: CourseDetailDto){
    if(!this.filters.includes(course.courseName)){
      this.filters.push(course.courseName);
    }
    if(!this.filters.includes(course.period.toString())){
      this.filters.push(course.period.toString())
    }
    if(course.credit==0 || course.credit==1){
      let fall: string = course.period.toString() + '-FALL_SEMESTER';
      let spring: string = course.period.toString() + '-SPRING_SEMESTER';
      if(!this.filters.includes(fall)) this.filters.push(fall);
      if(!this.filters.includes(spring)) this.filters.push(spring);
    }
    if(course.credit==0.5){
      if(!this.filters.includes(course.courseBlock)){
        this.filters.push(this.buildPeriodBlock(course));
      }
    }
  }

  buildPeriodBlock(course: CourseDetailDto){
    return course.period + '-'+course.courseBlock;
  }

  buildStudentList(){
    this.studentList = [];
    this.tempStudentList.filter((studentDetail)=>{
      if(studentDetail.student.gradeLevel == this.gradeSelect?.toString()) this.studentList.push(studentDetail);
    })
    if(this.studentList.length == 0){
      this.toastr.warning('No students in that grade found that are not enrolled in a course');
    } else {
      this.toastr.success('Student list populated');
    }
    this.showGradeSelect = false;
    this.showStudentSelectTable = true;
    this.showCourseSelect = false;
  }

  buildTempStudentList(){
    this.staffSvc.getAllMiddleHighStudents().subscribe(
      data=>{
        this.tempStudentList = data;
      }
    )
  }

  changeGradeLevel(){
    this.showGradeSelect = true;
    this.showStudentSelectTable = false;
    this.showCourseSelect = false;
  }

  changeStudent(){
    this.showGradeSelect = false;
    this.showStudentSelectTable = true;
    this.showCourseSelect = false;
    this.workingStudentCourseList = [];
  }

  filterCourses(){
    this.displayCourseList = [];
    let add: boolean = true;
    this.mainCourseList.forEach((c)=>{
      if(c.credit==1 || c.credit==0){
        if(this.filters.includes(c.period.toString() && c.courseName)
        || this.filters.includes(c.period.toString())){
          add = false;
        } else {
          add = true;
        }
      }
      if(c.credit == 0.5){
        if(this.filters.includes(this.buildPeriodBlock(c)) 
        || this.filters.includes(c.courseName) ){
          add = false;
        } else {
          add = true;
        }
      }
      if(add) this.displayCourseList.push(c);
    });
    this.sortStudentCourseList();
  }

  getCourse(){
    this.filters = [];
    this.workingStudentCourseList = [];
    this.staffSvc.getCoursesByStudentId(this.studentSelect!.student.userId).subscribe(
      response=>{
        response.forEach((c)=>{
          this.workingStudentCourseList.push(c);
          this.addFilter(c);
        })
        this.filterCourses();
        this.sortStudentCourseList();
      }
    )
  }

  removeCourse(course: CourseDetailDto){
    let temp: CourseDetailDto[] = [];
    temp = this.workingStudentCourseList.filter((c)=>c.cptId!=course.cptId);
    this.workingStudentCourseList = temp;
    this.removeFilter(course);
  }

  removeFilter(course: CourseDetailDto){
    let temp: string[] = [];
    let criteria: string[] = [];
    criteria.push(course.courseName, course.period.toString(), this.buildPeriodBlock(course));
    if(course.credit==1 || course.credit==0){
      criteria.push(course.period.toString() + '-FALL_SEMESTER',course.period.toString() + '-SPRING_SEMESTER');
    }
    this.filters.forEach((f) =>{
      if(!criteria.includes(f)){
        temp.push(f);
      } 
    })
    this.filters = temp;
    this.filterCourses();
  }

  selectCourse(course: CourseDetailDto){
    this.workingStudentCourseList.push(course);
    this.addFilter(course);
    this.filterCourses();
  }

  selectStudent(student: StudentDetailDto){
    this.studentSelect = student;
    this.showStudentSelectTable = false;
    this.showStudentSchedule = false;
    this.showCourseSelect = true;
    // this.workingStudentCourseList = [];
    this.getCourse();
  }
  

  sortField(flag: string) {
    switch (flag) {
      case 'asc-firstName':
        this.studentList.sort((a, b) => a.student.firstName.localeCompare(b.student.firstName));
        this.sortFlags[0]='desc';
        break;
      case 'desc-firstName':
        this.studentList.sort((a, b) => b.student.firstName.localeCompare(a.student.firstName));
        this.sortFlags[0]='asc';
        break;
      case 'asc-lastName':
        this.studentList.sort((a, b) => a.student.lastName.localeCompare(b.student.lastName));
        this.sortFlags[1]='desc';
        break;
      case 'desc-lastName':
        this.studentList.sort((a, b) => b.student.lastName.localeCompare(a.student.lastName));
        this.sortFlags[1]='asc';
        break;
      case 'asc-creditCount':
        this.studentList.sort((a, b) => a.creditCount - b.creditCount);
        this.sortFlags[2]='desc';
        break;
      case 'desc-creditCount':
        this.studentList.sort((a, b) => b.creditCount - a.creditCount);
        this.sortFlags[2]='asc';
        break;
    }
  }
  
  sortStudentCourseList(){
    this.workingStudentCourseList.sort((a,b)=>a.period - b.period);
  }

  submit(){
    let cptIds: number[] = [];
    this.workingStudentCourseList.forEach((course)=>{
      cptIds.push(course.cptId);
    })
    let assignStudentDto: AssignStudentDto = new AssignStudentDto();
    assignStudentDto.cptIds = cptIds;
    assignStudentDto.studentIds.push(this.studentSelect!.student.userId);
    this.staffSvc.submitStudentAssignmentDto(assignStudentDto).subscribe(
      response =>{
        this.tempStudentList = [];
        this.buildTempStudentList();
        this.showCourseSelect = false;
        this.showGradeSelect = true;
        this.showStudentSelectTable = false;
        this.showStudentSchedule = false;
        this.gradeSelect = '';
      }
    )
  }
}

type SortFlags = [firstNameSort: string,
  lastNameSort: string,
  creditCountSort: string];