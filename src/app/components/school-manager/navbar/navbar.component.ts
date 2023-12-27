import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(public smSvc: SchoolManagerService, private router: Router){}

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
      this.smSvc.login(this.loginReqDTO).subscribe({
        next:()=>{
          // this.router.navigate(['/schoolManager/userPage']);
          this.loginReqDTO = new SMLoginDTO('','');
        }
      })
    } else {
      console.log("username and/or password is empty");
    }
  }

  logout(){
    this.smSvc.logout();
  }

  editProfile(){

  }

  goToUserPage(){
    this.viewSelector = this.smSvc.roleView;
    switch(this.viewSelector){
      case 'ADMIN':
        this.router.navigate(['/schoolManager/staffPage']);
        break;
      case 'TEACHER':
        this.router.navigate(['/schoolManager/teacherPage']);
        break;
      case 'STUDENT':
        this.router.navigate(['/schoolManager/studentPage']);
        break;
      case 'PARENT':
        this.router.navigate(['/schoolManager/parentPage']);
        break;
      default:
        this.router.navigate(['/schoolManager/main']);
    }
  }
}
