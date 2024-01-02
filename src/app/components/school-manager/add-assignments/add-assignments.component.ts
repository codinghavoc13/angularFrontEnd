import { Component, OnInit } from '@angular/core';
import {FormGroup, FormArray, FormBuilder, Validators} from '@angular/forms';
import { AssignmentDto } from 'src/app/common/school-manager/assignment-dto';
import { AssignmentService } from 'src/app/service/school-manager/assignment.service';
import { UserService } from 'src/app/service/school-manager/user.service';

@Component({
  selector: 'app-add-assignments',
  templateUrl: './add-assignments.component.html',
  styleUrls: ['./add-assignments.component.css']
})
export class SMAddAssignmentsComponent implements OnInit{
  assignmentForm: FormGroup;
  assignmentDto!: AssignmentDto;

  ngOnInit(): void {
  }

  constructor(public fb: FormBuilder, private smUserSvc: UserService,
    public assignmentSvc: AssignmentService){
    this.assignmentForm = this.fb.group({
      teacher_id: smUserSvc.loggedInUser!.userId,
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
      }],
      assignmentDueDate:['',{
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
    console.log('aa-1');
    console.log(this.assignmentForm.value);
    this.assignmentDto = new AssignmentDto(this.assignmentForm.value);
    // console.log('aa-1');
    // console.log(this.assignmentDto.teacher_id);
    // console.log('aa-2');
    // console.log(this.assignmentDto.assignments);
    this.assignmentSvc.submitAssignments(this.assignmentDto);
  }
}
