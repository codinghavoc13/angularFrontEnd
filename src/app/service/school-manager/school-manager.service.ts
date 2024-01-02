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
}