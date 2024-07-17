import { Component, Input } from '@angular/core';
import { UserDto } from '../../common/user-dto';
import { MainModule } from '../../../main/module/main/main.module';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-view-students-sub',
  standalone: true,
  imports: [
    MainModule,
    NgxPaginationModule
  ],
  templateUrl: './view-students-sub.component.html',
  styleUrl: './view-students-sub.component.css'
})
export class ViewStudentsSubComponent {
  @Input() students: UserDto[] = [];
  ascDesc: boolean = true;

  page = 1;
  @Input() count = 0;
  pageSize = 6;
  pageSizes = [6,12,18];

  handlePageChange(event: number){
    this.page = event;
    // this.retrieveStudents();
  }

  handlePageSizeChange(event: any){
    this.pageSize = event.target.value;
    this.page = 1;
  }

  sortByLastNameAsc() {
    this.students.sort((a, b) => a.lastName.localeCompare(b.lastName));
    this.ascDesc = false;
  }

  sortByLastNameDesc() {
    this.students.sort((a, b) => b.lastName.localeCompare(a.lastName));
    this.ascDesc = true;
  }
}
