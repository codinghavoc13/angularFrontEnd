import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { Display } from '../../common/enum/display';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.css']
})
export class LogoutButtonComponent {
  @Output() displayEmit = new EventEmitter<Display>();

  constructor(private userSvc: UserService,
    private router: Router
  ){}

  logout(){
    // this.router.navigate(['listManager']);
    this.userSvc.logout();
    this.displayEmit.emit(Display.MAIN);
  }
}
