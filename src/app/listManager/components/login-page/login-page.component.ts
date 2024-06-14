import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDto } from '../../common/user-dto';
import { Display } from '../../common/display';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  @Output() displayEmit = new EventEmitter<Display>();
  loginDTO: UserDto = new UserDto('','','','',-1);

  constructor(public userSvc: UserService, 
    private router: Router, 
    private toastr: ToastrService){}

  async login(){
    await (await this.userSvc.login(this.loginDTO)).subscribe({
      next: (response)=>{
        this.toastr.success("You may pass");
        // this.userSvc.user.next(response);
        // this.userSvc.userId = response.userId;
        // this.userSvc.loggedIn = true;
        this.userSvc.updateDetails(response);
        this.displayEmit.emit(Display.LIST_INFO);
      },
      error:()=>{
        this.toastr.error("Username or password are incorrect");
      }
    });
  }
}
