import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListManagerService } from '../../service/list-manager.service';

@Component({
  selector: 'app-new-edit-list-items',
  templateUrl: './edit-list-items.component.html',
  styleUrls: ['./edit-list-items.component.css']
})
export class EditListItemsComponent implements OnInit{
  itemForm: FormGroup;
  //need to take in a listId number
  //need to build out a listInfoDto object using the listId
  //need to take the items from this.items().value and add to the listInfoDto above

  ngOnInit(): void {

  }

  constructor(public fb: FormBuilder, public listSvc: ListManagerService){
    this.itemForm = this.fb.group({
      items: this.fb.array([])
    })
    
    this.addItem();
  }

  items():FormArray{
    return this.itemForm.get('items') as FormArray;
  }

  addItem(){
    this.items().push(this.newItem());
    console.log(this.items().length)
  }

  newItem():FormGroup{
    return this.fb.group({
      itemName:['',{validators: [Validators.required]}],
      quantity:0,
      orderPosition:0,
      itemNotes:''
    })
  }

  removeAssignment(i: number){
    this.items().removeAt(i);
  }

  submit(){
    console.log(this.items().value)
  }
}
