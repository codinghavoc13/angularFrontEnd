import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SMLoginDTO } from 'src/app/common/school-manager/smlogin-dto';
import { SchoolManagerService } from 'src/app/service/school-manager/school-manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class SMLoginComponent {
  viewSelector: string = 'staff';
  loginReqDTO: SMLoginDTO = new SMLoginDTO('','');
  usernameRequiredWarning: boolean = false;
  passwordRequiredWarning: boolean = false;
  invalidLoginCredentials: boolean = this.smSvc.invalidLoginCredentials;

  constructor(private smSvc: SchoolManagerService, private router: Router,
    private toastr: ToastrService){}

  setView(view: string){
    this.viewSelector = view;
  }

  validateLoginDTO(){
    this.usernameRequiredWarning = this.loginReqDTO.username == '';
    this.passwordRequiredWarning = this.loginReqDTO.password =='';
    return !(this.usernameRequiredWarning || this.passwordRequiredWarning);
  }

  login(){
    if(this.validateLoginDTO()){
      console.log("Starting the login process");
      this.smSvc.login(this.loginReqDTO)//.subscribe({
      //   next:()=>{
      //     // this.router.navigate(['/schoolManager/userPage']);
      //     this.loginReqDTO = new SMLoginDTO('','');
      //   },
      //   error:()=>{
      //     this.toastr.error('Invalid login credentials');
      //   }
      // })
    } else {
      this.toastr.error("username and/or password is empty");
    }
  }
}
