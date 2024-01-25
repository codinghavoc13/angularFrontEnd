import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CourseDetailDto } from 'src/app/common/school-manager/course-detail-dto';
import { UserDto } from 'src/app/common/school-manager/user-dto';
import { StaffService } from 'src/app/service/school-manager/staff.service';

@Component({
  selector: 'app-assign-student-courses',
  templateUrl: './assign-student-courses.component.html',
  styleUrls: ['./assign-student-courses.component.css']
})
export class AssignStudentCoursesComponent implements OnInit{
  courseList: CourseDetailDto[] = [];
  creditCount: number = 0;
  filteredCourses: CourseDetailDto[] = [];
  grades: string[] = ['7','8','9','10','11','12'];
  gradeSelect: string = '';
  studentCourseList: CourseDetailDto[] = [
    // new CourseDetailDto(1,"A","B",1,"Homeroom","SEMESTER",0),
    // new CourseDetailDto(1,"C","D",1,"History","SEMESTER",6),
    // new CourseDetailDto(1,"E","F",1,"Music Appreciation","SEMESTER",1),
    // new CourseDetailDto(1,"G","H",1,"Geography","SEMESTER",5),
    // new CourseDetailDto(1,"I","J",1,"Algebra","SEMESTER",2),
    // new CourseDetailDto(1,"K","L",1,"English","SEMESTER",4),
    // new CourseDetailDto(1,"M","N",1,"Biology","SEMESTER",3)
  ];
  showCourseSelect: boolean = false;
  showGradeSelect: boolean = true;
  showStudentSelectTable: boolean = false;
  showStudentSchedule: boolean = false;
  studentList: UserDto[] = [];
  tempStudentList: UserDto[] = [];

  constructor(private staffSvc: StaffService, private toastr: ToastrService){}
  ngOnInit(): void {
    console.log('Loading student->courses');
    this.buildCourseList();
    this.buildTempStudentList();
  }

  async buildCourseList(){
    //need to create two service methods: one to only get courses with a period of -1 (no period) 
    //and one to get courses with a period greater than or equal to 0 (homeroom = 0)
    await this.staffSvc.getCourseDetails('middlehigh').subscribe(
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
    this.tempStudentList.filter((student)=>{
      if(student.gradeLevel == this.gradeSelect?.toString()) this.studentList.push(student);
    })
    if(this.studentList.length == 0){
      this.toastr.warning('No students in that grade found that are not enrolled in a course');
    } else {
      this.toastr.success('Student list populated');
    }
    //filter the course list based on the grade level
    this.showGradeSelect = false;
    this.showStudentSelectTable = true;
    this.showCourseSelect = false;
  }

  buildTempStudentList(){
    this.staffSvc.getStudentsNotAssignedToTeacher().subscribe(
      data=>{
        this.tempStudentList = data;
      }
    )
  }

  filterCourses(course: CourseDetailDto){
    let tempList: CourseDetailDto[] = [];
    if(course.credit==1 || course.credit==0){
      tempList = this.courseList.filter((c)=>c.period != course.period && c.courseName != course.courseName);
      // this.filteredCourses.concat(this.courseList.filter((c)=>c.period == course.period && c.courseName == course.courseName));
      this.courseList = tempList;
    }
    if(course.credit==0.5){
      console.log('1');
      this.courseList.forEach((c)=> {
        if(!((c.period==course.period && c.courseBlock=='FULL_YEAR') ||
        (c.period==course.period && c.courseBlock==course.courseBlock) ||
        c.courseName==course.courseName)){
          tempList.push(c);
        }
      });
      console.log('length of tempList: ' + tempList.length);
      this.courseList = tempList;
    }
  }

  getCourse(){
    console.log('Getting student course list from service');
    this.sortStudentCourseList();
  }

  selectCourse(course: CourseDetailDto){
    //need to update this so that after selecting a course this.courseList is filtered
    //to remove other courses with the same period; if the selected course is a half
    //credit course, need to only remove courses of the same courseBlock
    if(this.studentCourseList.find((c)=>c.period==course.period && c.courseId==-1)){
      console.log('asc-sc-1');
      this.studentCourseList.push(course);
      this.creditCount+=course.credit;
      this.filterCourses(course);
      console.log(this.courseList);
    } else {
      console.log('asc-sc-2');
    }
    if(this.studentCourseList.length>7){
      let tempCourseList: CourseDetailDto[] = [];
      tempCourseList = this.studentCourseList.filter((c)=>c.courseId>-1);
      this.studentCourseList = tempCourseList;
      this.sortStudentCourseList();
    }
  }

  selectStudent(student: UserDto){
    console.log('Doesn\'t do anything yet but will reach out to the back to get courses the student is enrolled in, if any');
    this.showStudentSelectTable = false;
    this.showStudentSchedule = false;
    this.showCourseSelect = true;
    this.creditCount = 0;
    this.getCourse();
  }

  /*Need to figure out how to handle courses that are only a semester long; 
  * maybe add a credits value to each course and update SEMESTER to be either
  * FALL_SEMESTER or SPRING_SEMESTER; credits will either be 1 for a full year
  * course or 0.5 for a one semester course; when building and filling in blanks,
  * default blank courses would have a credit of 1, would need a counter to track
  * how many credits are currently signed up; before sorting, if total credits is
  * 6.5, add a blank course with half a credit
   */
  sortStudentCourseList(){
    let check: CourseDetailDto[] = [];
    for(let i = 0; i < 7; i++){
      check = this.studentCourseList.filter((c)=>c.period==i);
      if(check.length==0){
        //no course found for a period
        // console.log('not found: ' + i);
        let blankCourse: CourseDetailDto = new CourseDetailDto(-1,"","",-1,"No course selected",'FULL_YEAR',i,1);
        this.studentCourseList.push(blankCourse);
      } else {
        //found a course or courses for that block
        // console.log('found ' + i);
        //if two courses were found, do nothing
        //if one course was found and the credit count is 1, do nothing
        //if one course was found and the credit count is 0.5
          //if the found course is a fall semester, add a blank spring semester
          //if the found course is a spring semester, add a flank fall semester
        if(check.length==1 && check.at(0)!.credit==0.5){
          if(check.at(0)!.courseBlock=='FALL_SEMESTER'){
            this.studentCourseList.push(new CourseDetailDto(-1,"","",-1,"No course selected",'SPRING_SEMESTER',i,1));
          }
          if(check.at(0)!.courseBlock=='SPRING_SEMESTER'){
            this.studentCourseList.push(new CourseDetailDto(-1,"","",-1,"No course selected",'FALL_SEMESTER',i,1));
          }
        }
      }
    }
    this.studentCourseList.sort((a,b)=>a.period - b.period);
  }

}
