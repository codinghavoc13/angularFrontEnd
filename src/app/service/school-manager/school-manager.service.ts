import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SMLoginDTO } from 'src/app/common/school-manager/smlogin-dto';

@Injectable({
  providedIn: 'root'
})
export class SchoolManagerService {
  roleView: string = '';

  constructor(private router: Router) { }

  login(loginReq: SMLoginDTO, role: string){
    console.log("Received the following login request for: " + loginReq.username + " / " + loginReq.password);
    console.log("Setting role to: " + role);
    this.roleView = role;
    this.router.navigate(['/schoolManager/userPage']);
  }
}
