import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SMLoginDTO } from '../../common/smlogin-dto';
import { UserService } from '../../service/user.service';
import { SchoolManagerModule } from '../../module/school-manager/school-manager.module';
import { MainModule } from '../../../main/module/main/main.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MainModule,
    SchoolManagerModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  viewSelector: string = 'staff';
  loginReqDTO: SMLoginDTO = new SMLoginDTO('','');
  usernameRequiredWarning: boolean = false;
  passwordRequiredWarning: boolean = false;
  invalidLoginCredentials: boolean = this.smUserSvc.invalidLoginCredentials;

  constructor(private smUserSvc: UserService, private router: Router,
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
      console.log("l-1 Starting the login process");
      this.smUserSvc.login(this.loginReqDTO)//.subscribe({
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
