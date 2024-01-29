import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AssignStudentDto } from 'src/app/common/school-manager/assign-student-dto';
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
  originalStudentCourseList:CourseDetailDto[]=[];//this is the list that is pulled from the database
  showCourseSelect: boolean = false;
  showGradeSelect: boolean = true;
  showStudentSelectTable: boolean = false;
  showStudentSchedule: boolean = false;
  studentList: UserDto[] = [];
  studentSelect: UserDto | undefined;
  tempStudentList: UserDto[] = [];
  workingStudentCourseList:CourseDetailDto[]=[]; //this is the list that is displayed

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

  changeStudent(){
    this.showGradeSelect = false;
    this.showStudentSelectTable = true;
    this.showCourseSelect = false;
  }

  filterCourses(course: CourseDetailDto){
    let tempList: CourseDetailDto[] = [];
    if(course.credit==1 || course.credit==0){
      //look into converting this from a filter into a foreach
      tempList = this.courseList.filter((c)=>c.period != course.period && c.courseName != course.courseName);
      // this.filteredCourses.concat(this.courseList.filter((c)=>c.period==course.period || c.courseName == course.courseName));
      this.courseList = tempList;
    }
    if(course.credit==0.5){
      // console.log('1');
      this.courseList.forEach((c)=> {
        if(!((c.period==course.period && c.courseBlock=='FULL_YEAR') ||
        (c.period==course.period && c.courseBlock==course.courseBlock) ||
        c.courseName==course.courseName)){
          tempList.push(c);
        } else {
          this.filteredCourses.push(c);
        }
      });
      // console.log('length of tempList: ' + tempList.length);
      this.courseList = tempList;
    }
    console.log(this.filteredCourses);
  }

  getCourse(){
    console.log('Doesn\'t do anything yet but will reach out to the back to get courses the student is enrolled in, if any');
    console.log('Getting student course list from service');
    this.sortStudentCourseList();
  }

  removeCourse(course: CourseDetailDto){
    let temp: CourseDetailDto[] = [];
    temp = this.workingStudentCourseList.filter((c)=>c.cptId!=course.cptId);
    this.workingStudentCourseList = temp;
    this.removeFilter(course);
    this.sortStudentCourseList();
  }

  removeFilter(course: CourseDetailDto){
    //need to take the course that is being removed and check in this.filteredCourses 
    //for courses that match, pull them out of this.filteredCourses and
    //add back to this.courseList
  }

  selectCourse(course: CourseDetailDto){
    //need to update this so that after selecting a course this.courseList is filtered
    //to remove other courses with the same period; if the selected course is a half
    //credit course, need to only remove courses of the same courseBlock
    if(this.workingStudentCourseList.find((c)=>c.period==course.period && c.courseId==-1)){
      this.workingStudentCourseList.push(course);
      this.creditCount+=course.credit;
      this.filterCourses(course);
      // console.log(this.courseList);
    }
    if(this.workingStudentCourseList.length>7){
      let tempCourseList: CourseDetailDto[] = [];
      tempCourseList = this.workingStudentCourseList.filter((c)=>c.courseId>-1);
      this.workingStudentCourseList = tempCourseList;
      this.sortStudentCourseList();
    }
  }

  selectStudent(student: UserDto){
    this.studentSelect = student;
    this.showStudentSelectTable = false;
    this.showStudentSchedule = false;
    this.showCourseSelect = true;
    this.creditCount = 0;
    this.getCourse();
  }
  
  sortStudentCourseList(){
    let check: CourseDetailDto[] = [];
    for(let i = 0; i < 7; i++){
      check = this.workingStudentCourseList.filter((c)=>c.period==i);
      if(check.length==0){
        //no course found for a period
        // console.log('not found: ' + i);
        let blankCourse: CourseDetailDto = new CourseDetailDto("FULL_YEAR",-1,"No course selected",-1,-1,i,"","",-1);
        this.workingStudentCourseList.push(blankCourse);
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
            this.workingStudentCourseList.push(new CourseDetailDto("SPRING_SEMESTER",-1,"No course selected",-1,-1,i,"","",-1));
          }
          if(check.at(0)!.courseBlock=='SPRING_SEMESTER'){
            this.workingStudentCourseList.push(new CourseDetailDto("SPRING_SEMESTER",-1,"No course selected",-1,-1,i,"","",-1));
          }
        }
      }
    }
    this.workingStudentCourseList.sort((a,b)=>a.period - b.period);
  }

  submit(){
    // console.log('asC-1-submit');
    // console.log(this.workingStudentCourseList);
    let cptIds: number[] = [];
    this.workingStudentCourseList.forEach((course)=>{
      cptIds.push(course.cptId);
    })
    let assignStudentDto: AssignStudentDto = new AssignStudentDto();
    assignStudentDto.cptIds = cptIds;
    assignStudentDto.studentIds.push(this.studentSelect!.userId);
    // console.log(assignStudentDto);
    this.staffSvc.submitStudentAssignmentDto(assignStudentDto).subscribe(
      response =>{
        //need to update the this.tempStudentList, either pull it down fresh or filter out the ones that match student_ids_temp
        this.tempStudentList = [];
        this.buildTempStudentList();
        //reset the show flags to take the user back to course select
        this.showCourseSelect = false;
        this.showGradeSelect = true;
        this.showStudentSelectTable = false;
        this.showStudentSchedule = false;
        this.gradeSelect = '';
      }
    )
  }
}
