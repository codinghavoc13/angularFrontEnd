import { Component, ElementRef, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EnrollStudentDto } from '../../common/enroll-student-dto';
import { RegisterDto } from '../../common/register-dto';
import { UserService } from '../../service/user.service';
import { SchoolManagerModule } from '../../module/school-manager/school-manager.module';
import { MainModule } from '../../../main/module/main/main.module';

@Component({
  selector: 'app-self-register',
  standalone: true,
  imports: [
    MainModule,
    SchoolManagerModule
  ],
  templateUrl: './self-register.component.html',
  styleUrl: './self-register.component.css'
})
export class SelfRegisterComponent {
  registerDTO: RegisterDto = new RegisterDto('', '', '', '', '', '', '', false);
  enrollStudentDTO: EnrollStudentDto = new EnrollStudentDto();
  compareDTO: RegisterDto = new RegisterDto('', '', '', '', '', '', '', false);
  emailValid: boolean = false;
  passwordValid: boolean = false;
  usernameNumber: number = 1;
  @Input() heading: string = 'Parent'

  constructor(private smUserSvc: UserService, private toastr: ToastrService,
    private elementRef: ElementRef) { }

  registerUser() {
    //This will need to be updated to send a different dto if enrolling students vs self registration
    //moving code to set a PARENT as primary to somewhere else, NTTOTM
    // this.registerDTO.role='PRIMARY';
    this.registerDTO.verified=false;
    // console.log('as-c-2');
    // console.log(this.registerDTO);
    if (this.validateRegDTO()) {
      this.smUserSvc.registerUser(this.registerDTO).subscribe(
        data => {
          // console.log('ru-1');
          // console.log(data);
          console.log(this.registerDTO);
          this.toastr.success('New user registered');
          this.registerDTO = new RegisterDto('', '', '', '', '', '', '', false);
        }
      )
    } else {
      this.toastr.error('All fields are required');
    }
  }

  enrollStudent(){
    this.enrollStudentDTO.parentId = this.smUserSvc.getLoggedInUserId();
    this.enrollStudentDTO.student = this.registerDTO;
    this.enrollStudentDTO.student.role='STUDENT';
    console.log(this.enrollStudentDTO);
    this.smUserSvc.enrollStudent(this.enrollStudentDTO).subscribe(
      data=>{
        this.toastr.success('Successfully enrolled new student');
      }
    );
  }

  validateRegDTO() {
    let result = true;
    result = result && !(this.registerDTO.firstName == '');
    result = result && !(this.registerDTO.lastName == '');
    result = result && !(this.registerDTO.username == '');
    result = result && !(this.registerDTO.role == '');
    //Parent Registration->Student Enrollment Notes: would need to add a check to only make this required for parents self registering
    result = result && this.emailValid;
    result = result && this.passwordValid;
    //going to rework the student id to be built by the backend before saving to database
    return result;
  }

  /*
  !!!!!NOT NEEDED WITH SELF REGISTRATION!!!!!
  Builds a 12 character string of random letters and number. Yes, eventually it will repeat
  but when combined with the random salt in the password hash system on the back end, chances
  of true duplicates are extremely low. 
  */
  // generateRandomPW() {
  //   const result = Math.random().toString(36).substring(2, 12);
  //   return result;
  // }

  async checkUsernameGen() {
    if (this.registerDTO.firstName != '' && this.registerDTO.lastName != '') {
    //   this.toastr.error('First and last names are required to generate username');
    // } else {
      let tempUserName = this.registerDTO.firstName.toLocaleLowerCase() + '.' + this.registerDTO.lastName.toLocaleLowerCase();
      const check = new RegisterDto('', '', 'STUDENT', tempUserName, '', '', '', false);
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

  async buildNewUsername(tempUsername: string) {
    let newTemp = tempUsername + this.usernameNumber;
    this.usernameNumber++;
    //setting this dto's role to STUDENT but will not actually be saved
    let check = new RegisterDto('', '', 'STUDENT', newTemp, '', '', '', false);
    this.callSvc(check, newTemp);
  }

  async callSvc(check: RegisterDto, checkName: string) {
    await this.smUserSvc.checkUsername(check).subscribe(
      data => {
        this.checkUsernameValid(checkName, data.valueOf());
      }
    );
  }

  clearForm() {
    this.registerDTO = new RegisterDto('', '', '', '', '', '', '', false);
  }

  checkPW() {
    if (this.registerDTO.password != '' && this.compareDTO.password != '') {
      if (this.registerDTO.password != this.compareDTO.password) {
        this.toastr.error('The passwords do not match');
        this.passwordValid = false;
      } else this.passwordValid = true;
    }
  }

  checkEmail() {
    if (this.registerDTO.emailString != '' && this.compareDTO.emailString != '') {
      if (this.registerDTO.emailString != this.compareDTO.emailString) {
        this.toastr.error('The email addresses do not match');
        this.emailValid = false;
      } else this.emailValid = true;
    }
  }

}
