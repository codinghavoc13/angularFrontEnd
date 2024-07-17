import { Component, OnInit } from '@angular/core';
import { UserDto } from '../../../common/user-dto';
import { UserService } from '../../../service/user.service';
import { MainModule } from '../../../../main/module/main/main.module';
import { AssignStudentCoursesComponent } from '../assign-student-courses/assign-student-courses.component';
import { AssignStudentsCourseComponent } from '../assign-students-course/assign-students-course.component';

@Component({
  selector: 'app-assign-student',
  standalone: true,
  imports: [
    MainModule,
    AssignStudentCoursesComponent,
    AssignStudentsCourseComponent
  ],
  templateUrl: './assign-student.component.html',
  styleUrl: './assign-student.component.css'
})
export class AssignStudentComponent implements OnInit{
  teacherList: UserDto[] = [];

  manyStudentsToOneCourse: boolean = false;
  oneStudentToManyCourses: boolean = false; 

  constructor(private smUserSvc: UserService){
  }
  
  ngOnInit(): void {
  }

  showManyStudentsToOneCourse(){
    this.manyStudentsToOneCourse = true;
    this.oneStudentToManyCourses = false;
  }

  showOneStudentToManyCourses(){
    this.manyStudentsToOneCourse = false;
    this.oneStudentToManyCourses = true;
  }

  async buildTeacherList(){
    await this.smUserSvc.getUsersByRole('TEACHER').subscribe(
      response => {
        response.forEach((u) =>{
          this.teacherList.push(u);
        })
      }
    )
  }

  sortTeachers(){
    this.teacherList.sort((a, b) => a.lastName.localeCompare(b.lastName));
  }
}
