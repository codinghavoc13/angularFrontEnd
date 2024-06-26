import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListManagerService } from '../../service/list-manager.service';
import { Display } from '../../common/display';
import { ListItemDto } from '../../common/list-item-dto';

@Component({
  selector: 'app-edit-list-items',
  templateUrl: './edit-list-items.component.html',
  styleUrls: ['./edit-list-items.component.css']
})
export class EditListItemsComponent implements OnInit{
  @Output() displayEmit = new EventEmitter<Display>();
  @Input() listId: number = -1;
  itemForm: FormGroup;
  
  //need to take in a listId number
  //need to build out a listInfoDto object using the listId
  //need to take the items from this.items().value and add to the listInfoDto above

  ngOnInit(): void {
    this.getList();
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
    // console.log(this.items().length)
  }

  getList(){
    this.items().clear();
    let item: ListItemDto;
    this.listSvc.buildList(this.listId).subscribe(
      data => {
        for(let i = 0; i < data.listItems.length; i++){
          this.items().push(this.loadItem(data.listItems.at(i) as ListItemDto));
        }
      }
    )
  }

  loadItem(item: ListItemDto):FormGroup{
    return this.fb.group({
      itemName:item.itemName,
      // quantity:item.quantity,
      orderPosition:item.orderPosition,
      itemNotes:item.itemNotes,
      listId:item.listId,
      listItemId:item.listItemId
    })
  }

  newItem():FormGroup{
    return this.fb.group({
      itemName:'',
      // quantity:0,
      orderPosition:0,
      itemNotes:'',
      listId:-1,
      listItemId:-1
    })
  }

  removeAssignment(i: number){
    this.items().removeAt(i);
  }

  returnToList(){
    this.displayEmit.emit(Display.LIST_DETAIL);
  }

  submit(){
    console.log(this.items().value);
    this.listSvc.buildList(this.listId).subscribe(
      data => {
        const list = data;
        list.listItems = this.items().value;
        console.log(list);
        this.listSvc.updateList(list).subscribe(
          data2 => {
            this.returnToList();
          }
        );
      }
    )
  }
}
