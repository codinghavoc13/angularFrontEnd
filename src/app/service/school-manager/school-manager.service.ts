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
          const temp = new Map();
          temp.set('username', data.username);
          temp.set('role', data.role);
          temp.set('firstName',data.firstname);
          temp.set('lastName',data.lastname);
          temp.set('userId', data.staff_id);
          this.roleView = data.role;
          // console.log(JSON.stringify(Array.from(temp)));
          localStorage.setItem('user',JSON.stringify(Array.from(temp)));
          this.currentUserSrc.next(user);
          this.router.navigate(['/schoolManager/userPage']);
        }
      }
    )
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSrc.next(null);
    this.router.navigate(['/schoolManager/main']);
  }
}