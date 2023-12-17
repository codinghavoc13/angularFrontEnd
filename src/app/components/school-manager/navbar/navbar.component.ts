import { Component } from '@angular/core';
import { SMLoginDTO } from 'src/app/common/school-manager/smlogin-dto';
import { SchoolManagerService } from 'src/app/service/school-manager/school-manager.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  viewSelector: string = 'staff';
  loginReqDTO: SMLoginDTO = new SMLoginDTO('','');
  usernameRequiredWarning: boolean = false;
  passwordRequiredWarning: boolean = false;
  invalidLoginCredentials: boolean = this.smSvc.invalidLoginCredentials;

  constructor(public smSvc: SchoolManagerService){}

  setView(view: string){
    this.viewSelector = view;
  }

  validateLoginDTO(){
    this.usernameRequiredWarning = this.loginReqDTO.username == '';
    this.passwordRequiredWarning = this.loginReqDTO.password =='';
    return !(this.usernameRequiredWarning || this.passwordRequiredWarning);
  }

  login(){
    console.log(this.loginReqDTO);
    if(this.validateLoginDTO()){
      console.log("Starting the Staff login process, this still in the works, doesn't do anything right now");
      this.smSvc.login(this.loginReqDTO);
    } else {
      console.log("username and/or password is empty");
    }
  }

  logout(){
    this.smSvc.logout();
  }
}
