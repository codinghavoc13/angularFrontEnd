import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assign-student-courses',
  templateUrl: './assign-student-courses.component.html',
  styleUrls: ['./assign-student-courses.component.css']
})
export class AssignStudentCoursesComponent implements OnInit{
  ngOnInit(): void {
    console.log('Loading student->courses');
  }

}
