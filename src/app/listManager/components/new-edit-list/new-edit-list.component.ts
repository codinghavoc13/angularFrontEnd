import { Component, Input, OnInit } from '@angular/core';
import { ListInfoDto } from '../../common/list-info-dto';
import { ListManagerService } from '../../service/list-manager.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-edit-list',
  templateUrl: './new-edit-list.component.html',
  styleUrls: ['./new-edit-list.component.css']
})
export class NewEditListComponent implements OnInit{
  listInfoDto: ListInfoDto = new ListInfoDto(false,[],-1,0,-1,'','');
  // listToEdit: ListInfoDto = new ListInfoDto(false,[],-1,0,-1,'','');
  originalList: ListInfoDto = new ListInfoDto(false,[],-1,0,-1,'','');
  @Input() listIdToEdit: number = -1;

  constructor(private listSvc: ListManagerService){}
  
  ngOnInit(): void {
    console.log('nel-1: ' + this.listIdToEdit);
    if(this.listIdToEdit>=0){
      console.log('need to edit an existing list');
      this.getList();
    }
  } 
  
  getList(){
    this.listSvc.buildList(this.listIdToEdit).subscribe(
      data=>{
        this.originalList = data;
        this.listInfoDto = data;
      }
    )
  }

  discardChanges(){
    if(this.listIdToEdit == -1){
      this.listInfoDto = new ListInfoDto(false,[],-1,0,-1,'','');
    } else {
      this.getList();
    }
  }

  getListToEdit(list: ListInfoDto){
    
  }

  submit(){
    console.log(this.listInfoDto);
  }

}
