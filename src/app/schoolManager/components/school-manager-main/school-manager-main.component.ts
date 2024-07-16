import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { SchoolManagerModule } from '../../module/school-manager/school-manager.module';
import { MainModule } from '../../../main/module/main/main.module';

@Component({
  selector: 'app-school-manager-main',
  standalone: true,
  imports: [
    MainModule,
    SchoolManagerModule
  ],
  templateUrl: './school-manager-main.component.html',
  styleUrl: './school-manager-main.component.css'
})
export class SchoolManagerMainComponent {
  constructor(public smUserSvc: UserService){}

  logout(){
    this.smUserSvc.logout();
  }
}
