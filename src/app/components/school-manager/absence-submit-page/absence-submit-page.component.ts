import { Component } from '@angular/core';
import { SchoolManagerService } from 'src/app/service/school-manager/school-manager.service';

@Component({
  selector: 'app-absence-submit-page',
  templateUrl: './absence-submit-page.component.html',
  styleUrls: ['./absence-submit-page.component.css']
})
export class AbsenceSubmitPageComponent {
  constructor(public smSvc: SchoolManagerService){
    
  }
}
