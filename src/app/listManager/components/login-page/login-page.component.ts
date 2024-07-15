import { Component, EventEmitter, Output } from '@angular/core';
import { Display } from '../../common/enum/display';
import { UserDto } from '../../common/user-dto';
import { UserService } from '../../service/user.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MainModule } from '../../../main/module/main/main.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, MainModule,
    ReactiveFormsModule, FormsModule,
  ToastrModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  @Output() displayEmit = new EventEmitter<Display>();
  loginDTO: UserDto = new UserDto('','','','',-1);

  constructor(public userSvc: UserService,
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
