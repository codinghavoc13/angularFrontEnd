import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { UserDto } from '../common/user-dto';

@Injectable({
  providedIn: 'root'
})
export class SchoolManagerService {
  baseUrl = "http://localhost:8080";
  private currentUserSrc = new BehaviorSubject<UserDto|null>(null);
  currentUser$ = this.currentUserSrc.asObservable();
  roleView: string = 'main';
  loggedInUser: UserDto | undefined;
  invalidLoginCredentials: boolean = false;

  constructor(private router: Router, private httpClient: HttpClient,
    private toastr: ToastrService) { }
}
