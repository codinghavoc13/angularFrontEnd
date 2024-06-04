import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { EnrollStudentDto } from '../common/enroll-student-dto';
import { RegisterDto } from '../common/register-dto';
import { SMLoginDTO } from '../common/smlogin-dto';
import { UserDto } from '../common/user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = "http://localhost:8080/user";
  // staffUrl = "http://localhost:8080/staff";
  usernameCheck: boolean = true;
  private currentUserSrc = new BehaviorSubject<UserDto|null>(null);
  currentUser$ = this.currentUserSrc.asObservable();
  roleView: string = 'main';
  private loggedInUser: UserDto | undefined;
  invalidLoginCredentials: boolean = false;

  constructor(private httpClient: HttpClient, private router: Router, private toastr: ToastrService) { }

  login(loginReq: SMLoginDTO){
    const urlString = this.userUrl+"/login";
    return this.httpClient.post<UserDto>(this.userUrl+"/login",loginReq).subscribe({
      next: (response)=>{
        const user = response;
        if(user){
          this.roleView = user.role;
          this.loggedInUser = user;
          this.currentUserSrc.next(user);
          this.router.navigate(['/schoolManager/userPage']);
        }
      },
      error:()=>{
        this.toastr.error("Invalid login credentials");
      }
    }      
    )
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSrc.next(null);
    this.roleView = 'main';
    this.router.navigate(['/schoolManager/main']);
  }

  registerUser(dto: RegisterDto){
    //CODINGHAVOC This will need to commented out for in prep of going online
    console.log('user-svc-1');
    console.log(dto);
    return this.httpClient.post<UserDto>(this.userUrl+"/saveNewUser",dto);
  }

  enrollStudent(dto: EnrollStudentDto){
    console.log('user-svc-es-1');
    console.log(dto);
    return this.httpClient.post<UserDto>(this.userUrl+"/enrollStudent",dto);
  }

  checkUsername(tempUser: RegisterDto){
    return this.httpClient.post<boolean>(this.userUrl+"/checkUsername", tempUser);
  }

  getAllUsers(){
    return this.httpClient.get<UserDto[]>(this.userUrl+"/getAllUsersSimple");
  }

  /**
   * need to add checks where ever these are used to handle bad returns
   */
  getLoggedInUserId(){
    return this.loggedInUser == undefined ? -1 : this.loggedInUser.userId;
  }

  getLoggedInUserRole(){
    return this.loggedInUser == undefined ? 'NOT_LOGGED_IN' : this.loggedInUser.role;
  }

  getLoggedInUserRoleView(){
    return this.roleView;
  }

  getLoggedInUserVerification(){
    return this.loggedInUser == undefined ? false : true;
  }

  getStudentsByGradeLevel(grade_level: number){

  }

  getStudentsByParentId(parent_id: number){
    return this.httpClient.get<UserDto[]>(this.userUrl+"/getStudentsByParentId/"+parent_id);
  }

  getUsersByRole(role: string){
    return this.httpClient.get<UserDto[]>(this.userUrl+"/getUsersByRole/"+role);
  }
}
