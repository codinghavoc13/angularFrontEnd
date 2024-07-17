import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { MainModule } from '../../../main/module/main/main.module';

@Component({
  selector: 'app-absence-submit-page',
  standalone: true,
  imports: [MainModule],
  templateUrl: './absence-submit-page.component.html',
  styleUrl: './absence-submit-page.component.css'
})
export class AbsenceSubmitPageComponent {
  constructor(public smUserSvc: UserService){
    
  }
}
