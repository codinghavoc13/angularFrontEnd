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
  invalidLoginCredentials: boolean = false;
  userTgt: any;

  constructor(private router: Router, private httpClient: HttpClient) { }

  login(loginReq: SMLoginDTO){
    const urlString = this.baseUrl+"/staff/login";
    // console.log("Received the following login request for: " + loginReq.username + " / " + loginReq.password);
    // console.log("Working with: " + urlString);
    return this.httpClient.post<User>(urlString,loginReq).subscribe(
      data=>{
        if(data==null){
          this.invalidLoginCredentials = true;
        } else {
          const user = data;
          this.userTgt = user;
          this.roleView = data.role;
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSrc.next(user);
          this.router.navigate(['/schoolManager/userPage']);
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
}