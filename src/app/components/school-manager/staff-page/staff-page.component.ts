import { Component, OnInit } from '@angular/core';
import { SchoolManagerService } from 'src/app/service/school-manager/school-manager.service';

@Component({
  selector: 'app-staff-page',
  templateUrl: './staff-page.component.html',
  styleUrls: ['./staff-page.component.css']
})
export class StaffPageComponent implements OnInit{
  staff_first_name: string = '';
  staff_id: number = -1;

  constructor(private smSvc: SchoolManagerService){}

  ngOnInit(): void {
      console.log("localstorage - firstname: " + localStorage.getItem('user'));
      this.smSvc.currentUser$.subscribe(
        data=>{
          console.log(data?.firstname!);
          this.staff_first_name = data!.firstname!;
        }
      )
  }
}
