import { Component, Input } from '@angular/core';
import { User } from 'src/app/common/school-manager/user';

@Component({
  selector: 'app-view-user-table',
  templateUrl: './view-user-table.component.html',
  styleUrls: ['./view-user-table.component.css']
})
export class ViewUserTableComponent {
  @Input() userList: User[] = [];
  @Input() groupTitle: string = '';

  sortFlags: SortFlags = ['asc','asc','asc','asc'];

  //firstname, lastname, email, username
  sortByLastNameAsc() {
    this.userList.sort((a, b) => a.lastName.localeCompare(b.lastName));
  }

  sortByLastNameDesc() {
    this.userList.sort((a, b) => b.lastName.localeCompare(a.lastName));
  }

  sortField(flag: string) {
    switch (flag) {
      case 'asc-firstName':
        this.userList.sort((a, b) => a.firstName.localeCompare(b.firstName));
        this.sortFlags[0]='desc';
        break;
      case 'desc-firstName':
        this.userList.sort((a, b) => b.firstName.localeCompare(a.firstName));
        this.sortFlags[0]='asc';
        break;
      case 'asc-lastName':
        this.userList.sort((a, b) => a.lastName.localeCompare(b.lastName));
        this.sortFlags[1]='desc';
        break;
      case 'desc-lastName':
        this.userList.sort((a, b) => b.lastName.localeCompare(a.lastName));
        this.sortFlags[1]='asc';
        break;
      case 'asc-emailString':
        this.userList.sort((a, b) => a.emailString.localeCompare(b.emailString));
        this.sortFlags[2]='desc';
        break;
      case 'desc-emailString':
        this.userList.sort((a, b) => b.emailString.localeCompare(a.emailString));
        this.sortFlags[2]='asc';
        break;
      case 'asc-username':
        this.userList.sort((a, b) => a.username.localeCompare(b.username));
        this.sortFlags[3]='desc';
        break;
      case 'desc-username':
        this.userList.sort((a, b) => b.username.localeCompare(a.username));
        this.sortFlags[3]='asc';
        break;
    }
  }
}

type SortFlags = [firstNameSort: string,
  lastNameSort: string,
  emailStringSort: string,
  usernameSort: string];