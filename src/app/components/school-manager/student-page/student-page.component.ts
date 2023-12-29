import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SchoolManagerService } from 'src/app/service/school-manager/school-manager.service';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})
export class StudentPageComponent implements OnInit{
  constructor(public smSvc: SchoolManagerService,
    private router: Router){}

  ngOnInit(): void {
    if(this.smSvc.roleView=='main') this.router.navigate(['/schoolManager/main']);
  }

}
