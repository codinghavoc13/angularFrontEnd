import { Injectable } from '@angular/core';
import { UserDto } from '../common/user-dto';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ListManagerService } from './list-manager.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = "http://localhost:8080/listManager/user";
  // user: UserDto = new UserDto('','','','',-1);
  private user = new BehaviorSubject<UserDto|null>(null);
  currentUser$ = this.user.asObservable();
  userId: number = -1;
  loggedIn: boolean = false;

  constructor(private httpClient: HttpClient,
    private toastr: ToastrService, 
    private router: Router
  ) { }

  login(loginDetails: UserDto){
    const loginURL = this.userUrl+"/login";
    return this.httpClient.post<UserDto>(loginURL, loginDetails).subscribe({
      next: (response)=>{
        this.toastr.success("You may pass");
        this.user.next(response);
        this.userId = response.userId;
        this.loggedIn = true;
        // console.log(this.user);
        this.router.navigate(['listManager/listPage']);
      },
      error:()=>{
        this.toastr.error("Username or password are incorrect");
      }
    })
  }

  logout(){
    // console.log(this.user);
    this.user.next(null);// = new UserDto('','','','',-1);
    this.loggedIn = false;
    // console.log(this.user);
    this.router.navigate(['listManager'])
  }
}
