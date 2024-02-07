import { Component, OnInit } from '@angular/core';
import { CourseDetailDto } from 'src/app/common/school-manager/course-detail-dto';

@Component({
  selector: 'app-parent-test',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})

export class ParentComponent implements OnInit {
  courseList:CourseDetailDto[] = [];
  public isCollapsed = -1;

  constructor() { }

  ngOnInit(): void {
    this.buildCourseList();
  }

  buildCourseList(){
    this.courseList.push(new CourseDetailDto('Full Year',1,'English 1',1,1,1,'Sarah','Smith',1));
    this.courseList.push(new CourseDetailDto('Full Year',1,'English 1',2,1,2,'Sarah','Smith',1));
    this.courseList.push(new CourseDetailDto('Full Year',1,'English 1',3,1,3,'Sarah','Smith',1));
    this.courseList.push(new CourseDetailDto('Full Year',1,'English 1',4,1,4,'Sarah','Smith',1));
    this.courseList.push(new CourseDetailDto('Full Year',1,'English 1',5,1,5,'Sarah','Smith',1));
    this.courseList.push(new CourseDetailDto('Full Year',1,'English 1',6,1,6,'Sarah','Smith',1));
  }

}
