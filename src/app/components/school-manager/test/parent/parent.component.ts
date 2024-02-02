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
    this.mainCourseList.push(new CourseDetailDto("FULL_YEAR", 1, "English 1", 1, 1, 1, "Jane", "Doe", 1));//0
    this.mainCourseList.push(new CourseDetailDto("FULL_YEAR", 2, "English 1", 2, 1, 2, "Jane", "Doe", 1));//1
    this.mainCourseList.push(new CourseDetailDto("FULL_YEAR", 2, "English 1", 2, 1, 3, "Jane", "Doe", 1));//2
    this.mainCourseList.push(new CourseDetailDto("FULL_YEAR", 2, "English 1", 2, 1, 4, "Jane", "Doe", 1));//3
    this.mainCourseList.push(new CourseDetailDto("FALL_SEMESTER", 3, "Anatomy", 3, 0.5, 1, "Jane", "Doe", 1));//4
    this.mainCourseList.push(new CourseDetailDto("SPRING_SEMESTER", 3, "Anatomy", 4, 0.5, 1, "Jane", "Doe", 1));//5
    this.mainCourseList.push(new CourseDetailDto("FALL_SEMESTER", 3, "Anatomy", 3, 0.5, 2, "Jane", "Doe", 1));//6
    this.mainCourseList.push(new CourseDetailDto("SPRING_SEMESTER", 3, "Anatomy", 4, 0.5, 2, "Jane", "Doe", 1));//7
    this.mainCourseList.push(new CourseDetailDto("FULL_YEAR", 4, "English 2", 5, 1, 1, "Jane", "Doe", 1));//8
    this.mainCourseList.push(new CourseDetailDto("FULL_YEAR", 5, "English 2", 6, 1, 2, "Jane", "Doe", 1));//9
    this.mainCourseList.push(new CourseDetailDto("FULL_YEAR", 4, "English 2", 5, 1, 3, "Jane", "Doe", 1));//10
    this.mainCourseList.push(new CourseDetailDto("FULL_YEAR", 5, "English 2", 6, 1, 4, "Jane", "Doe", 1));//11
    this.mainCourseList.push(new CourseDetailDto("FALL_SEMESTER", 6, "Psyche", 7, 0.5, 5, "Jane", "Doe", 1));//12
    this.mainCourseList.push(new CourseDetailDto("SPRING_SEMESTER", 6, "Psyche", 8, 0.5, 5, "Jane", "Doe", 1));//13
    this.mainCourseList.push(new CourseDetailDto("FALL_SEMESTER", 6, "Psyche", 7, 0.5, 5, "Jane", "Doe", 1));//14
    this.mainCourseList.push(new CourseDetailDto("SPRING_SEMESTER", 6, "Psyche", 8, 0.5, 5, "Jane", "Doe", 1));//15
    this.mainCourseList.push(new CourseDetailDto("FALL_SEMESTER", 3, "World Religions", 3, 0.5, 1, "Jane", "Doe", 1));//16
    this.mainCourseList.push(new CourseDetailDto("SPRING_SEMESTER", 3, "World Religions", 4, 0.5, 1, "Jane", "Doe", 1));//17
    this.mainCourseList.push(new CourseDetailDto("FALL_SEMESTER", 3, "World Religions", 3, 0.5, 2, "Jane", "Doe", 1));//18
    this.mainCourseList.push(new CourseDetailDto("SPRING_SEMESTER", 3, "World Religions", 4, 0.5, 2, "Jane", "Doe", 1));//19
    this.filterCourses();
    // this.selectCourse(this.mainCourseList[4]); //select anatomy fall semester period 1
    // this.removeFilter(this.mainCourseList[4]); //removing anatomy fall semester
    this.selectCourse(this.mainCourseList[1]); //select english 1 period 2
    // this.removeFilter(this.mainCourseList[1]); //removing english 1 period 2
    // this.selectCourse(this.mainCourseList[17]); //selecting world religions spring semester
    this.displayCourse();
  }

  selectCourse(course: CourseDetailDto){
    this.workingStudentCourse.push(course);
    this.addFilter(course);
    this.filterCourses();
  }

  filterCourses(){
    console.log('p-fc-1',this.filters)
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
        // || this.filters.includes(c.period.toString())){
          add = false;
        } else {
          add = true;
        }
      }
      if(add) this.displayCourseList.push(c);
    });
  }

  displayCourse(){
    console.log(this.displayCourseList.length)
    this.displayCourseList.forEach((c)=>{
      console.log('courseName:',c.courseName,'period:',c.period,'block:',c.courseBlock);
    })
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

  removeFilter(course: CourseDetailDto){
    let temp: string[] = [];
    let criteria: string[] = [];
    criteria.push(course.courseName, course.period.toString(), this.buildPeriodBlock(course));
    if(course.credit==1 || course.credit==0){
      criteria.push(course.period.toString() + '-FALL_SEMESTER',course.period.toString() + '-SPRING_SEMESTER');
    }
    this.filters.forEach((f) =>{
      // if(f != course.courseName && f != course.period.toString() && f != this.buildPeriodBlock(course)){
      if(!criteria.includes(f)){
        temp.push(f);
      } 
    })
    console.log(temp);
    this.filters = temp;
    this.filterCourses();
  }

  //older version
  filterCourses2(course: CourseDetailDto) {
    let tempList: CourseDetailDto[] = [];
    this.mainCourseList.forEach((c) => {
      if(course.credit==1 || course.credit==0){
        if (c.period!=course.period && c.courseName != course.courseName) {
          tempList.push(c);
        } else {
          this.filteredCourses.push(c);
        }
      }
      if(course.credit==0.5){
        if(!((c.period==course.period && c.courseBlock=='FULL_YEAR') ||
        (c.period==course.period && c.courseBlock==course.courseBlock) ||
        c.courseName==course.courseName)){
          tempList.push(c);
        } else {
          this.filteredCourses.push(c);
        }
      }
    });
    this.displayCourseList = tempList;
  }

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
