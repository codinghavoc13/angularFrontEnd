import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDto } from '../../common/user-dto';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  loginDTO: UserDto = new UserDto('','','','',-1);

  constructor(public userSvc: UserService, private router: Router, private toastr: ToastrService){}

  login(){
    // this.toastr.success('You clicked the button');
    // console.log(this.loginDTO);
    this.userSvc.login(this.loginDTO);
  }
}
