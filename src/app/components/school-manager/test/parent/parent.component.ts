import { Component, OnInit } from '@angular/core';
import { CourseDetailDto } from 'src/app/common/school-manager/course-detail-dto';

@Component({
  selector: 'app-parent-test',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})

export class ParentComponent implements OnInit{
  viewTab='home';
  roleFromParent='STAFF';
  courseList: CourseDetailDto[] = [];

  setTabView(event: string){
    this.viewTab = event;
  }

  constructor(){}

  ngOnInit(): void {
  }

  async buildCourseList(){
  }

}
