import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-add-test',
  templateUrl: './dynamic-add-test.component.html',
  styleUrls: ['./dynamic-add-test.component.css']
})
export class DynamicAddTestComponent {
  assignmentForm: FormGroup;

  ngOnInit(): void {
  }

  constructor(public fb: FormBuilder){
    this.assignmentForm = this.fb.group({
      teacher_id: 0,
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

  generateRandomPW(){
    console.log('dat-1');
    const result = Math.random().toString(36).substring(2,12);
    console.log(result);
  }

}
