import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterDto } from 'src/app/common/school-manager/register-dto';
import { SMLoginDTO } from 'src/app/common/school-manager/smlogin-dto';
import { User } from 'src/app/common/school-manager/user';
import { BehaviorSubject, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { EnrollStudentDto } from 'src/app/common/school-manager/enroll-student-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = "http://localhost:8080/user";
  staffUrl = "http://localhost:8080/staff";
  usernameCheck: boolean = true;
  private currentUserSrc = new BehaviorSubject<User|null>(null);
  currentUser$ = this.currentUserSrc.asObservable();
  roleView: string = 'main';
  loggedInUser: User | undefined;
  invalidLoginCredentials: boolean = false;

  constructor(private httpClient: HttpClient, private router: Router, private toastr: ToastrService) { }

  login(loginReq: SMLoginDTO){
    const urlString = this.userUrl+"/login";
    return this.httpClient.post<User>(this.userUrl+"/login",loginReq).subscribe({
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
    console.log('user-svc-1');
    console.log(dto);
    return this.httpClient.post<User>(this.userUrl+"/saveNewUser",dto);
  }

  enrollStudent(dto: EnrollStudentDto){
    console.log('user-svc-es-1');
    console.log(dto);
    return this.httpClient.post<User>(this.userUrl+"/enrollStudent",dto);
  }

  checkUsername(tempUser: RegisterDto){
    return this.httpClient.post<boolean>(this.userUrl+"/checkUsername", tempUser);
  }

  getAllUsers(){
    return this.httpClient.get<User[]>(this.userUrl+"/getAllUsersNoPW");
  }

  getStudentsByGradeLevel(grade_level: number){

  }

  getStudentsByParentId(parent_id: number){
    return this.httpClient.get<User[]>(this.userUrl+"/getStudentsByParentId/"+parent_id);
  }

  getStudentsNotAssignedToTeacher(){
    return this.httpClient.get<User[]>(this.staffUrl+"/getStudentsNotAssignedToTeacher");
  }

  getUsersByRole(role: string){
    return this.httpClient.get<User[]>(this.userUrl+"/getUsersByRole/"+role);
  }

  getUnverifiedUsers(){
    return this.httpClient.get<User[]>(this.staffUrl+"/getUnverifiedUsers");
  }

  verifyUser(userId: number){
    this.httpClient.put<User>(this.staffUrl+"/verifyUser/"+userId, null).subscribe(
      // data => console.log('u-svc-1: ' + data)
    );
  }
}
