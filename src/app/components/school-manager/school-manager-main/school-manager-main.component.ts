import { Component } from '@angular/core';
import { SchoolManagerService } from 'src/app/service/school-manager/school-manager.service';

@Component({
  selector: 'app-school-manager-main',
  templateUrl: './school-manager-main.component.html',
  styleUrls: ['./school-manager-main.component.css']
})
export class SMMainComponent {
  constructor(public smSvc: SchoolManagerService){}

  logout(){
    this.smSvc.logout();
  }

}
