import { Component, EventEmitter, Output } from '@angular/core';
import { Display } from '../../common/enum/display';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [],
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.css'
})
export class LogoutButtonComponent {
  @Output() displayEmit = new EventEmitter<Display>();

  constructor(private userSvc: UserService
  ){}

  logout(){
    // this.router.navigate(['listManager']);
    this.userSvc.logout();
    this.displayEmit.emit(Display.MAIN);
  }

}
