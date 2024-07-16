import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RegisterDto } from '../../../common/register-dto';
import { UserService } from '../../../service/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {
  registerDTO: RegisterDto = new RegisterDto('', '', '', '', '', '','', false);
  usernameNumber: number = 1;
  checkUsername: boolean = true;

  constructor(private smUserSvc: UserService, private toastr: ToastrService) { }

  registerStudent() {
    // console.log('as-c-2');
    // console.log("setting password to 'password' but code is in place to set the password to: " + this.generateRandomPW());
    this.registerDTO.password = 'password';
    // console.log('as-c-2');
    // console.log(this.registerDTO);
    //setting verified to false, admin will go through later and verify everyone
    this.registerDTO.verified = false;
    if (this.validateRegDTO()) {
      this.smUserSvc.registerUser(this.registerDTO).subscribe(
        data=>{
          console.log('ru-1');
          console.log(data);
        }  
      )
      this.toastr.success('New user registered');
      this.registerDTO = new RegisterDto('','','','','','','', false);
    } else {
      this.toastr.error('All fields are required');
    }
  }

  validateRegDTO() {
    let result = true;
    result = result && !(this.registerDTO.firstName == '');
    result = result && !(this.registerDTO.lastName == '');
    result = result && !(this.registerDTO.username == '');
    result = result && !(this.registerDTO.role == '');
    if (this.registerDTO.role == 'STUDENT')
      result = result && !(this.registerDTO.schoolStudentId == '');
    return result;
  }

  /*Builds a 12 character string of random letters and number. Yes, eventually it will repeat
  but when combined with the random salt in the password hash system on the back end, chances
  of true duplicates are extremely low
  */
  generateRandomPW() {
    const result = Math.random().toString(36).substring(2, 12);
    return result;
  }

  async checkUsernameGen() {
    if (this.registerDTO.firstName == '' || this.registerDTO.lastName == '') {
      this.toastr.error('First and last names are required to generate username');
    } else {
      let tempUserName = this.registerDTO.firstName.toLocaleLowerCase() + '.' + this.registerDTO.lastName.toLocaleLowerCase();
      const check = new RegisterDto('', '', 'STUDENT', tempUserName, '', '','', false);
      this.callSvc(check, tempUserName);
    }
  }

  checkUsernameValid(tempUserName: string, flag: boolean) {
    if (flag) {
      this.buildNewUsername(tempUserName);
    } else {
      this.registerDTO.username = tempUserName;
      //we've assigned an unused username, with or without a number, reset usernameNumber back to 1
      this.usernameNumber = 1;
    }
  }

  async buildNewUsername(tempUsername:string) {
    let newTemp = tempUsername + this.usernameNumber;
    this.usernameNumber++;
    let check = new RegisterDto('', '', 'STUDENT', newTemp, '', '','', false);
    this.callSvc(check, newTemp);
  }

  async callSvc(check: RegisterDto, checkName: string){
    await this.smUserSvc.checkUsername(check).subscribe(
      data => {
        this.checkUsernameValid(checkName, data.valueOf());
      }
    );
  }

  clearForm(){
    this.registerDTO = new RegisterDto('','','','','','','', false);
  }

}
