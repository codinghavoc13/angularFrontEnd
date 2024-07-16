import { Component, OnInit } from '@angular/core';
import { UserDto } from '../../../common/user-dto';
import { UserService } from '../../../service/user.service';
import { SchoolManagerModule } from '../../../module/school-manager/school-manager.module';
import { MainModule } from '../../../../main/module/main/main.module';

@Component({
  selector: 'app-assign-student',
  standalone: true,
  imports: [
    MainModule,
    SchoolManagerModule
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
