import { Component } from '@angular/core';
import { SMLoginDTO } from 'src/app/common/school-manager/smlogin-dto';
import { SchoolManagerService } from 'src/app/service/school-manager/school-manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class SMLoginComponent {
  viewSelector: string = 'student';
  loginReqDTO: SMLoginDTO = new SMLoginDTO('','');
  usernameRequiredWarning: boolean = false;
  passwordRequiredWarning: boolean = false;

  constructor(private smSvc: SchoolManagerService){

  }

  setView(view: string){
    this.viewSelector = view;
  }

  validateLoginDTO(){
    this.usernameRequiredWarning = this.loginReqDTO.username == '';
    this.passwordRequiredWarning = this.loginReqDTO.password =='';
    return !(this.usernameRequiredWarning || this.passwordRequiredWarning);
  }

  parentLogin(){
    console.log(this.loginReqDTO);
    if(this.validateLoginDTO()){
        console.log("Starting the Parent login process, this still in the works, doesn't do anything right now");
        this.smSvc.login(this.loginReqDTO,'parent');
      } else {
        console.log("username and/or password is empty");
      }
  }

  staffLogin(){
    console.log(this.loginReqDTO);
    if(this.validateLoginDTO()){
      console.log("Starting the Staff login process, this still in the works, doesn't do anything right now");
      this.smSvc.login(this.loginReqDTO, 'staff');
    } else {
      console.log("username and/or password is empty");
    }
  }

  studentLogin(){
    console.log(this.loginReqDTO);
    if(this.validateLoginDTO()) {
      console.log("Starting the Student login process, this still in the works, doesn't do anything right now");
      this.smSvc.login(this.loginReqDTO,'student');
    } else {
      console.log("username and/or password is empty");
    }
  }
}
