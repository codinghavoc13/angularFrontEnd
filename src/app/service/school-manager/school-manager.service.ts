import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
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
  roleView: string = '';
  // user_id: number = 0;
  loggedInUser: User | undefined;
  invalidLoginCredentials: boolean = false;
  // userTgt: User | undefined;

  constructor(private router: Router, private httpClient: HttpClient) { }

  login(loginReq: SMLoginDTO){
    const urlString = this.baseUrl+"/staff/login";//this will need to change
    return this.httpClient.post<User>(this.baseUrl+"/staff/login",loginReq).pipe(
      map((response:User)=>{
        const user = response;
        if(user){
          console.log(user);
          this.roleView = user.role;
          // this.user_id = user.userId;
          this.loggedInUser = user;
          this.currentUserSrc.next(user);
          this.goToUserPage();
        }
      })
    )
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSrc.next(null);
    this.roleView = 'main';
    this.router.navigate(['/schoolManager/main']);
  }

  goToUserPage(){
    switch(this.roleView){
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