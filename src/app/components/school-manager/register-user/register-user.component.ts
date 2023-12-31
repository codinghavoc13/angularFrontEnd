import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RegisterDto } from 'src/app/common/school-manager/register-dto';
import { StudentRegisterDto } from 'src/app/common/school-manager/student-register-dto';
import { UserService } from 'src/app/service/school-manager/user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
  registerDTO: RegisterDto = new RegisterDto('','','','','','');
  usernameNumber: number = 0;
  checkUsername: boolean = true;

   constructor(private smUserSvc: UserService, private toastr: ToastrService){}

   registerStudent(){
    // console.log('as-c-1');
    // this.studentRegisterDTO.role="STUDENT";
    console.log('as-c-2');
    console.log("setting password to 'password' but code is in place to set the password to: " + this.generateRandomPW());
    this.registerDTO.password='password';
    console.log('as-c-2');
    console.log(this.registerDTO);
    if(this.validateRegDTO()){
      this.smUserSvc.registerStudent(this.registerDTO);
    } else {
      this.toastr.error('All fields are required');
    }
   }

   validateRegDTO(){
    let result = true;
    result = result && !(this.registerDTO.firstName=='');
    result = result && !(this.registerDTO.lastName=='');
    result = result && !(this.registerDTO.username=='');
    result = result && !(this.registerDTO.role=='');
    if(this.registerDTO.role=='STUDENT')
      result = result && !(this.registerDTO.schoolStudentId=='');
    // console.log('validate-1');
    // console.log(result);
    return result;
   }

   /*Builds a 12 character string of random letters and number. Yes, eventually it will repeat
   but when combined with the random salt in the password hash system on the back end, chances
   of true duplicates are extremely low
   */
   generateRandomPW(){
    // console.log('dat-1');
    const result = Math.random().toString(36).substring(2,12);
    // console.log(result);
    return result;
  }

  async generateUsername(){
    if(this.registerDTO.firstName == '' || this.registerDTO.lastName == ''){
      this.toastr.error('First and last names are required to generate username');
    } else {
      let tempUserName = this.registerDTO.firstName.toLocaleLowerCase() + '.' + this.registerDTO.lastName.toLocaleLowerCase();
      // console.log('gu-1');
      // console.log(tempUserName);
      // this.studentRegisterDTO.username = tempUserName;
      const check = new RegisterDto('','','STUDENT',tempUserName,'','');
      // console.log('gu-2');
      // console.log(this.studentRegisterDTO.username);
      // await this.smUserSvc.getUsernames();
      // console.log('gu-2');
      // console.log(this.smUserSvc.usernames.find(u=>u===tempUserName));
      // await console.log(this.smUserSvc.checkUsername(check));
      console.log('gu-3');
      if(await this.smUserSvc.checkUsername(check)){
        console.log('gu-4');
        this.toastr.error('that user name is already used');
      } else {
        console.log('gu-5');
        this.toastr.success('that user name is available');
        this.registerDTO.username = tempUserName;
      }
    }
  }

  buildUsername(dto: RegisterDto){

  }
}
