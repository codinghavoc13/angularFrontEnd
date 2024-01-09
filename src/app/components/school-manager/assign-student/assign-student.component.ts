import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/common/school-manager/user';
import { UserService } from 'src/app/service/school-manager/user.service';

@Component({
  selector: 'app-assign-student',
  templateUrl: './assign-student.component.html',
  styleUrls: ['./assign-student.component.css']
})
export class AssignStudentComponent implements OnInit{
  tempStudentList: User[] = [];
  studentList: User[] = [];
  teacherList: User[] = [];
  // gradeSelect: number | undefined;
  selMultiStudent: boolean = true;
  selMultiTeacher: boolean = true;  

  testForm: FormGroup;

  constructor(private smUserSvc: UserService, public fb: FormBuilder){
    this.testForm = this.fb.group({
      //form control names need to be updated to match DTO fields
      gradeSelect: this.fb.control,
      studentSelect: this.fb.control,
      teacherSelect: this.fb.control,
      studentMultipleSelect: this.fb.control,
      teacherMultipleSelect: this.fb.control
    })
  }
  
  ngOnInit(): void {
    this.buildTeacherList();
    this.sortTeachers();
    this.buildTempStudentList();
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

  buildTempStudentList(){
    this.smUserSvc.getStudentsNotAssignedToTeacher().subscribe(
      data=>{
        this.tempStudentList = data;
      }
    )
  }

  buildStudentList(){
    if(this.testForm.value.gradeSelect>6){
      this.selMultiStudent = false;
      this.selMultiTeacher = true;
    } else {
      this.selMultiStudent = true;
      this.selMultiTeacher = false;
    }
    this.studentList = [];
    this.tempStudentList.filter((student)=>{
      if(student.gradeLevel == this.testForm.value.gradeSelect.toString()) this.studentList.push(student);
    })
  }

  submitForm(){
    console.log('as-sf-1');
    console.log(JSON.stringify(this.testForm.value));
    //this is what is coming from the formgroup:
    //{"gradeSelect":"4","studentSelect":[61,60],"teacherSelect":[2]}
    //need to update elements in here to match the backend, run postman tests
  }
}
