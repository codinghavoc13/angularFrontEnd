import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SMLoginDTO } from 'src/app/common/school-manager/smlogin-dto';
import { SchoolManagerService } from 'src/app/service/school-manager/school-manager.service';
import { UserService } from 'src/app/service/school-manager/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() loggedInRole: string = '';
  @Input() loggedInVerification: boolean = true;
  @Output() viewEmitter = new EventEmitter();
  viewSelector: string = 'staff';
  loginReqDTO: SMLoginDTO = new SMLoginDTO('','');
  usernameRequiredWarning: boolean = false;
  passwordRequiredWarning: boolean = false;
  invalidLoginCredentials: boolean = this.smUserSvc.invalidLoginCredentials;

  constructor(public smUserSvc: UserService, private router: Router,
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
      // console.log("nb-1 Starting the login process");
      this.smUserSvc.login(this.loginReqDTO)//.subscribe({
      //   next:()=>{
      //     this.loginReqDTO = new SMLoginDTO('','');
      //   }
      // })
    } else {
      this.toastr.error("username and/or password is empty");
    }
  }

  logout(){
    this.smUserSvc.logout();
  }

  setTabView(view: string){
    // console.log('nb-2: ' + view);
    this.viewSelector = view;
    // console.log('nb-3: '+ this.viewSelector);
    this.viewEmitter.emit(view);
    // this.checkUserPermission(this.loggedInRole);
  }

  checkUserPermission(role: string){
    // console.log('nb-cup-role: ' + role);
    console.log('nb-cup-verified: ' + this.loggedInVerification);
    if(this.loggedInVerification){
      if(this.loggedInRole==role){
        return true;
      }
    }
    return false;
  }
}
