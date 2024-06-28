import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListInfoDto } from '../../common/list-info-dto';
import { ListManagerService } from '../../service/list-manager.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit{
  @Input() listIdToEdit: number = -1;
  @Output() returnEmit = new EventEmitter<number>();
  listInfoDto: ListInfoDto = new ListInfoDto(false,[],-1,0,-1,'','');

  constructor(private listSvc: ListManagerService,
    private userSvc: UserService
  ){}
  
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

  returnToMainPage(){
    this.returnEmit.emit(-1);
  }

  submit(){
    console.log(this.listInfoDto);
    this.listInfoDto.userId = this.userSvc.userId
    this.listSvc.updateList(this.listInfoDto).subscribe(
      data =>{
        this.listInfoDto = data;
        this.returnToMainPage();
      }
    )
  }

}
