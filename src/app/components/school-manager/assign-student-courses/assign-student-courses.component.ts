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
  grades: string[] = ['7','8','9','10','11','12'];
  gradeSelect: string = '';
  studentCourseList: CourseDetailDto[] = [
    // new CourseDetailDto(1,"A","B",1,"Homeroom","SEMESTER",0),
    new CourseDetailDto(1,"C","D",1,"History","SEMESTER",6),
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
    await this.staffSvc.getCourseDetails('semester').subscribe(
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

  getCourse(){
    console.log('Getting student course list from service');
    this.sortStudentCourseList();
  }

  selectCourse(course: CourseDetailDto){
    console.log(this.studentCourseList);
    console.log(course);
    if(this.studentCourseList.find((c)=>c.period==course.period && c.courseId==-1)){
      this.studentCourseList.push(course);
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
    this.getCourse();
  }

  sortStudentCourseList(){
    for(let i = 0; i < 7; i++){
      if(!this.studentCourseList.find((c)=>c.period==i)){
        console.log('not found: ' + i);
        let blankCourse: CourseDetailDto = new CourseDetailDto(-1,"","",-1,"No course selected","SEMESTER",i);
        this.studentCourseList.push(blankCourse);
      } else {
        console.log('found ' + i);
      }
    }
    this.studentCourseList.sort((a,b)=>a.period - b.period);
  }

}
