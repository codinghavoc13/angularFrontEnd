import { Component, OnInit } from '@angular/core';
import { CourseDetailDto } from 'src/app/common/school-manager/course-detail-dto';
import { GradeBookDTO } from 'src/app/common/school-manager/grade-book-dto';
import { TeacherService } from 'src/app/schoolManager/service/teacher.service';

@Component({
  selector: 'app-parent-test',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})

export class ParentComponent implements OnInit {

  constructor(private teacherSvc: TeacherService) { }

  ngOnInit(): void {
  }
}
