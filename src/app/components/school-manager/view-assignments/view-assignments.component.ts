import { Component, OnInit } from '@angular/core';
import { SchoolManagerService } from 'src/app/service/school-manager/school-manager.service';

@Component({
  selector: 'app-view-assignments',
  templateUrl: './view-assignments.component.html',
  styleUrls: ['./view-assignments.component.css']
})
export class ViewAssignmentsComponent implements OnInit{

  public constructor(public smSvc: SchoolManagerService){}

  ngOnInit(): void {
    console.log('va-1');
    console.log(this.smSvc.roleView);
  }

}
