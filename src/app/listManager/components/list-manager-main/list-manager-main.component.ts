import { Component, Input, OnInit } from '@angular/core';
import { Display } from '../../common/display';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-list-manager-main',
  templateUrl: './list-manager-main.component.html',
  styleUrls: ['./list-manager-main.component.css']
})
export class ListManagerMainComponent implements OnInit{
  public display: Display = Display.MAIN;
  @Input() displayChange = Display.MAIN;

  ngOnInit(): void {
  }

  constructor(private userSvc: UserService){}

  isMain(){
    return this.display === Display.MAIN;
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

  switchDisplay(display: Display){
    this.display = display;
  }
}
