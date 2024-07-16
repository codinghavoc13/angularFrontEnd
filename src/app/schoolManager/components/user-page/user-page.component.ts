import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { SchoolManagerModule } from '../../module/school-manager/school-manager.module';
import { MainModule } from '../../../main/module/main/main.module';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    MainModule,
    SchoolManagerModule
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent implements OnInit{
  viewTab='home';
  userRole: string = '';
  userVerification: boolean = true;

  constructor(public smUserSvc: UserService,
    private router: Router){

  }
  ngOnInit(): void {
    if(this.smUserSvc.roleView=='main') {
      this.router.navigate(['/schoolManager/main']);
    } else {
      this.userRole = this.smUserSvc.getLoggedInUserRole()
      this.userVerification = this.smUserSvc.getLoggedInUserVerification();
    }
  }

  logout(){
    this.smUserSvc.logout();
  }

  setTabView(view: string){
    this.viewTab = view;
  }
}
