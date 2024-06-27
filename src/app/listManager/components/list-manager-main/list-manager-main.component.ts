import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Display } from '../../common/enum/display';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-list-manager-main',
  templateUrl: './list-manager-main.component.html',
  styleUrls: ['./list-manager-main.component.css']
})
export class ListManagerMainComponent implements OnInit{
  public display: Display = Display.MAIN;
  listId: number = -1;
  @Input() displayChange = Display.MAIN;
  @Output() listIdToDisplay = new EventEmitter<number>();

  ngOnInit(): void {
  }

  constructor(private userSvc: UserService){}

  editListByID(listId: number){
    this.listId = listId;
    this.display = Display.EDIT_LIST_INFO;
    console.log(this.listId)
  }

  isMain(){
    return this.display === Display.MAIN;
  }

  isEditListInfo(){
    return this.display === Display.EDIT_LIST_INFO;
  }

  isEditListItems(){
    return this.display === Display.EDIT_LIST_ITEMS;
  }

  isListDetail(){
    return this.display === Display.LIST_DETAIL;
  }

  isListInfo(){
    return this.display === Display.LIST_INFO;
  }

  isLogin(){
    return this.display === Display.LOGIN;
  }

  getUserSvc(){
    return this.userSvc;
  }

  login(){
    this.switchDisplay(Display.LOGIN);
  }

  newList(){
    this.display = Display.EDIT_LIST_INFO;
  }

  switchDisplay(display: Display){
    this.display = display;
  }

  viewListByID(listId: number){
    this.listId = listId;
    if(listId >= 0){
      this.switchDisplay(Display.LIST_DETAIL);
    } else {
      this.display = Display.LIST_INFO;
    }
  }
}
