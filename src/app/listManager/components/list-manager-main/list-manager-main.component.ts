import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Display } from '../../common/display';
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

  isMain(){
    return this.display === Display.MAIN;
  }

  isCreateEdit(){
    return this.display === Display.NEW_EDIT_LIST_INFO;
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

  setListId(listId: number){
    this.listId = listId;
    if(listId >= 0){
      this.switchDisplay(Display.LIST_DETAIL);
    } else {
      this.display = Display.LIST_INFO;
    }
  }

  switchDisplay(display: Display){
    this.display = display;
  }
}
