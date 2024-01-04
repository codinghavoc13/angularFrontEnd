import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-enroll-student',
  templateUrl: './enroll-student.component.html',
  styleUrls: ['./enroll-student.component.css']
})
export class EnrollStudentComponent implements OnInit{
  studentForm: FormGroup;

  ngOnInit(): void {}

  constructor(public fb: FormBuilder){
    this.studentForm = this.fb.group({
      parent_id: 29,
      students: this.fb.array([])
    });
  }

  students():FormArray{
    return this.studentForm.get("students") as FormArray
  }

  newStudent():FormGroup{
    return this.fb.group({
      firstName:['',{
        validators:[Validators.required]
      }],
      lastName:['',{
        validators:[Validators.required]
      }],
      username:['',{
        // validators:[Validators.required]
      }],
      emailString:[''],
      password:['',{
        validators:[Validators.required]
      }],
      gradeLevel:['',{
        validators:[Validators.required]
      }]
      //need to add username, email, password, gradeLevel
      //email needs to be set up as optional
      //username needs to do the same as in self-register, may move that to a separate util
    })
  }

  addStudent(){
    this.students().push(this.newStudent());
  }

  removeStudent(i:number){
    this.students().removeAt(i);
  }

  onSubmit(){
    console.log('es-os-1');
    console.log(this.studentForm.value);
    //would need to loop over each student and set role to 'STUDENT'
  }
}
