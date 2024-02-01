import { Component, OnInit } from '@angular/core';
import { CourseDetailDto } from 'src/app/common/school-manager/course-detail-dto';

@Component({
  selector: 'app-parent-test',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})

export class ParentComponent implements OnInit {
  viewTab = 'home';
  roleFromParent = 'STAFF';
  mainCourseList: CourseDetailDto[] = [];
  displayCourseList: CourseDetailDto[] = [];
  filteredCourses: CourseDetailDto[] = [];
  workingStudentCourse: CourseDetailDto[]=[];
  filters: string[] = [];

  setTabView(event: string) {
    this.viewTab = event;
  }

  constructor() { }

  ngOnInit(): void {
    // let blankCourse: CourseDetailDto = new CourseDetailDto("FULL_YEAR",-1,"No course selected",-1,-1,i,"","",-1);
    // courseBlock, courseId, courseName, cptId, credit, period, teacherFirstName, teacherLastName, teacherId
    let cdd1: CourseDetailDto = new CourseDetailDto("FULL_YEAR", 1, "English 1", 1, 1, 1, "Jane", "Doe", 1);
    let cdd2: CourseDetailDto = new CourseDetailDto("FULL_YEAR", 2, "English 1", 2, 1, 2, "Jane", "Doe", 1);
    let cdd3: CourseDetailDto = new CourseDetailDto("FALL_SEMESTER", 3, "Anatomy", 3, 0.5, 1, "Jane", "Doe", 1);
    let cdd4: CourseDetailDto = new CourseDetailDto("SPRING_SEMESTER", 3, "Anatomy", 4, 0.5, 1, "Jane", "Doe", 1);
    let cdd5: CourseDetailDto = new CourseDetailDto("FULL_YEAR", 4, "English 2", 5, 1, 3, "Jane", "Doe", 1);
    let cdd6: CourseDetailDto = new CourseDetailDto("FULL_YEAR", 5, "English 2", 6, 1, 4, "Jane", "Doe", 1);
    let cdd7: CourseDetailDto = new CourseDetailDto("FALL_SEMESTER", 6, "Psyche", 7, 0.5, 2, "Jane", "Doe", 1);
    let cdd8: CourseDetailDto = new CourseDetailDto("SPRING_SEMESTER", 6, "Psyche", 8, 0.5, 2, "Jane", "Doe", 1);
    this.mainCourseList.push(cdd1);
    this.mainCourseList.push(cdd2);
    this.mainCourseList.push(cdd3);
    this.mainCourseList.push(cdd4);
    this.mainCourseList.push(cdd5);
    this.mainCourseList.push(cdd6);
    this.mainCourseList.push(cdd7);
    this.mainCourseList.push(cdd8);
    console.log('p-test-2');
    console.log(this.mainCourseList);
    this.selectCourse(cdd1); //removing English 1 1st period, should also remove the other English 1 and both Anatomy
    // this.selectCourse(cdd3);//removing fall semester anatomy, should remove all 1st period courses and the other anatomy
    this.selectCourse(cdd8);
    // console.log('test - course list');
    // console.log(this.courseList);
    // console.log('test - working list');
    // console.log(this.workingStudentCourse);
    // console.log('test - filtered list');
    // console.log(this.filteredCourses);
    // console.log('test - removing course');
    console.log(this.mainCourseList);
    console.log('removing filter for English 1 1st period');
    this.removeFilter(cdd1);
    // this.removeFilter(cdd3);
    // console.log('test - course list');
    // console.log(this.courseList);
    // console.log('test - working list');
    // console.log(this.workingStudentCourse);
    // console.log('test - filtered list');
    // console.log(this.filteredCourses);
  }

  selectCourse(course: CourseDetailDto){
    this.workingStudentCourse.push(course);
    if(!this.filters.includes(course.courseName)){
      this.filters.push(course.courseName);
    }
    if(!this.filters.includes(course.period.toString())){
      this.filters.push(course.period.toString())
    }
    console.log(this.filters);
    this.filterCourses();
  }

  filterCourses(){
    this.displayCourseList = [];
    console.log('fc-2',this.filters);
    this.mainCourseList.forEach((c)=>{
      if(!this.filters.includes(c.period.toString() || c.courseName)){
        this.displayCourseList.push(c);
      }
    });
    console.log('fc-1');
    console.log(this.displayCourseList);
  }

  removeFilter(course: CourseDetailDto){
    let temp: string[] = [];
    this.filters.forEach((f) =>{
      if(f != course.courseName && f != course.period.toString()){
        temp.push(f);
      } 
    })
    console.log(temp);
    this.filters = temp;
    this.filterCourses();
  }

  //older version
  // filterCourses(course: CourseDetailDto) {
  //   let tempList: CourseDetailDto[] = [];
  //   this.courseList.forEach((c) => {
  //     if(course.credit==1 || course.credit==0){
  //       if (c.period!=course.period && c.courseName != course.courseName) {
  //         tempList.push(c);
  //       } else {
  //         this.filteredCourses.push(c);
  //       }
  //     }
  //     if(course.credit==0.5){
  //       if(!((c.period==course.period && c.courseBlock=='FULL_YEAR') ||
  //       (c.period==course.period && c.courseBlock==course.courseBlock) ||
  //       c.courseName==course.courseName)){
  //         tempList.push(c);
  //       } else {
  //         this.filteredCourses.push(c);
  //       }
  //     }
  //   });
  //   this.courseList = tempList;
  // }

  // removeFilter(course: CourseDetailDto){
  //   let tempListFilter: CourseDetailDto[] = [];
  //   let tempListAdd: CourseDetailDto[] = [];
  //   let tempWorking: CourseDetailDto[] = [];

  //   this.filteredCourses.forEach((c)=>{
  //     if(course.credit==1 || course.credit==0){
  //       if (c.period==course.period || c.courseName == course.courseName) {
  //         tempListAdd.push(c);
  //       } else {
  //         tempListFilter.push(c);
  //       }
  //     }
  //     if(course.credit==0.5){
  //       if(!((c.period==course.period && c.courseBlock=='FULL_YEAR') ||
  //       (c.period==course.period && c.courseBlock==course.courseBlock) ||
  //       c.courseName==course.courseName)){
  //         tempListAdd.push(c);
  //       } else {
  //         tempListFilter.push(c);
  //       }
  //     }
  //   });
  //   this.workingStudentCourse.forEach((c)=>{
  //     if(c.cptId!=course.cptId) tempWorking.push(c);
  //   });
  //   this.workingStudentCourse = tempWorking;
  //   this.filteredCourses = tempListFilter;
  //   this.courseList = this.courseList.concat(tempListAdd);
  // }

}
