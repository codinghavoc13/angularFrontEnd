import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map } from 'rxjs';
import { Assignment } from 'src/app/common/school-manager/assignment';
import { AssignmentDto } from 'src/app/common/school-manager/assignment-dto';
import { SMLoginDTO } from 'src/app/common/school-manager/smlogin-dto';
import { User } from 'src/app/common/school-manager/user';

@Injectable({
  providedIn: 'root'
})

//model this off the service in the dating app
export class SchoolManagerService {
  baseUrl = "http://localhost:8080";
  private currentUserSrc = new BehaviorSubject<User|null>(null);
  currentUser$ = this.currentUserSrc.asObservable();
  roleView: string = 'main';
  loggedInUser: User | undefined;
  invalidLoginCredentials: boolean = false;

  constructor(private router: Router, private httpClient: HttpClient,
    private toastr: ToastrService) { }

  login(loginReq: SMLoginDTO){
    const urlString = this.baseUrl+"/user/login";
    // return this.httpClient.post<User>(this.baseUrl+"/user/login",loginReq).pipe(
    //   map((response:User)=>{
    //     const user = response;
    //     if(user){
    //       this.roleView = user.role;
    //       this.loggedInUser = user;
    //       this.currentUserSrc.next(user);
    //       this.router.navigate(['/schoolManager/userPage']);
    //     }
    //   })
    // )
    return this.httpClient.post<User>(this.baseUrl+"/user/login",loginReq).subscribe({
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

    // if(this.validateLoginDTO()){
    //   console.log("Starting the login process");
    //   this.smSvc.login(this.loginReqDTO).subscribe({
    //     next:()=>{
    //       this.loginReqDTO = new SMLoginDTO('','');
    //     }
    //   })
    // } else {
    //   this.toastr.error("username and/or password is empty");
    // }
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSrc.next(null);
    this.roleView = 'main';
    this.router.navigate(['/schoolManager/main']);
  }
}