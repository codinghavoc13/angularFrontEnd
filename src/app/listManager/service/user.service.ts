import { Injectable } from '@angular/core';
import { UserDto } from '../common/user-dto';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = "http://localhost:8080/listManager/user";
  // user: UserDto = new UserDto('','','','',-1);
  user = new BehaviorSubject<UserDto|null>(null);
  currentUser$ = this.user.asObservable();
  userId: number = -1;
  loggedIn: boolean = false;

  constructor(private httpClient: HttpClient,
    private toastr: ToastrService, 
    private router: Router
  ) { }

  login(loginDetails: UserDto){
    const loginURL = this.userUrl+"/login";
    return this.httpClient.post<UserDto>(loginURL, loginDetails);
  }

  logout(){
    this.user.next(null);// = new UserDto('','','','',-1);
    this.loggedIn = false;
  }

  updateDetails(response: UserDto){
    this.user.next(response);
    this.userId = response.userId;
    this.loggedIn = true;
  }
}
