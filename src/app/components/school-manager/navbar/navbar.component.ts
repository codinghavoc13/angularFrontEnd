import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SMLoginDTO } from 'src/app/common/school-manager/smlogin-dto';
import { SchoolManagerService } from 'src/app/service/school-manager/school-manager.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() loggedInRole: string = '';
  @Output() viewEmitter = new EventEmitter();
  viewSelector: string = 'staff';
  loginReqDTO: SMLoginDTO = new SMLoginDTO('','');
  usernameRequiredWarning: boolean = false;
  passwordRequiredWarning: boolean = false;
  invalidLoginCredentials: boolean = this.smSvc.invalidLoginCredentials;

  constructor(public smSvc: SchoolManagerService, private router: Router,
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
      //     this.loginReqDTO = new SMLoginDTO('','');
      //   }
      // })
    } else {
      this.toastr.error("username and/or password is empty");
    }
  }

  logout(){
    this.smSvc.logout();
  }

  setTabView(view: string){
    this.viewSelector = view;
    this.viewEmitter.emit(view);
  }
}
