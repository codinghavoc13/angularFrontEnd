import { Component, Input, OnInit } from '@angular/core';
import { UserDto } from 'src/app/common/school-manager/user-dto';
import { UserService } from 'src/app/service/school-manager/user.service';

@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.css']
})
export class ViewStudentsComponent implements OnInit{
  students: UserDto[] = [];
  ascDesc: boolean = true;

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3,6,9];

  constructor(private smUserSvc: UserService){}

  ngOnInit(): void {
    // this.parent_id = this.smUserSvc.loggedInUser?.userId;
    //rework this to call a different userSvc method based on loggedInUser role
    console.log(this.smUserSvc.loggedInUser!.role);
    // if(this.smUserSvc.loggedInUser!.role == 'ADMIN'){
    //   this.smUserSvc.getUsersByRole('STUDENT').subscribe(
    //     response=>{
    //       this.students = response;
    //       console.log(this.students.length);
    //     }
    //   )
    // }
    this.retrieveStudents();
  }
  
  retrieveStudents(){
    if(this.smUserSvc.loggedInUser!.role == 'ADMIN'){
      this.smUserSvc.getUsersByRole('STUDENT').subscribe(
        response=>{
          this.students = response;
          this.count = this.students.length;
        }
      )
    }
  }

  handlePageChange(event: number){
    this.page = event;
    this.retrieveStudents();
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
