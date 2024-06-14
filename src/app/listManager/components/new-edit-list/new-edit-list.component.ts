import { Component } from '@angular/core';
import { ListInfoDto } from '../../common/list-info-dto';

@Component({
  selector: 'app-new-edit-list',
  templateUrl: './new-edit-list.component.html',
  styleUrls: ['./new-edit-list.component.css']
})
export class NewEditListComponent {
  listInfoDto: ListInfoDto = new ListInfoDto(false,[],-1,0,-1,'','');
  listToEdit: ListInfoDto = new ListInfoDto(false,[],-1,0,-1,'','');

  discardChanges(){}

  getListToEdit(list: ListInfoDto){
    
  }

  submit(){
    console.log(this.listInfoDto);
  }

}
