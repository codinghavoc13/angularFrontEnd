import { Component, Input, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormArray, FormBuilder, Validators} from '@angular/forms';
import { SchoolManagerService } from 'src/app/service/school-manager/school-manager.service';

@Component({
  selector: 'app-add-assignments',
  templateUrl: './add-assignments.component.html',
  styleUrls: ['./add-assignments.component.css']
})
export class SMAddAssignmentsComponent implements OnInit{
  assignmentForm: FormGroup;

  ngOnInit(): void {
  }

  constructor(public fb: FormBuilder, public smSvc: SchoolManagerService){
    this.assignmentForm = this.fb.group({
      teacher_id: smSvc.loggedInUser!.userId,
      assignments: this.fb.array([])
    });
  }

  assignments():FormArray{
    return this.assignmentForm.get("assignments") as FormArray
  }

  newAssignment():FormGroup{
    return this.fb.group({
      assignmentTitle:['',{
        validators: [ Validators.required],
      }],
      assignmentType:['',{
        validators: [ Validators.required],
      }]
    })
  }

  addAssignment(){
    this.assignments().push(this.newAssignment());
  }

  removeAssignment(i:number){
    this.assignments().removeAt(i);
  }

  onSubmit(){
    //this will likely be reworked later to send the json values to the back end
    console.log(this.assignmentForm.value);
  }
}
