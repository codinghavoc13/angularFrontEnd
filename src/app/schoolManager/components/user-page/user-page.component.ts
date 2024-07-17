import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { MainModule } from '../../../main/module/main/main.module';
import { AddAssignmentsComponent } from '../add-assignments/add-assignments.component';
import { AbsenceSubmitPageComponent } from '../absence-submit-page/absence-submit-page.component';
import { ProfilePageComponent } from '../profile-page/profile-page.component';
import { ViewAssignmentsComponent } from '../view-assignments-main/view-assignments/view-assignments.component';
import { RegisterUserComponent } from '../admin-main/register-user/register-user.component';
import { MainContentComponent } from '../main-content/main-content.component';
import { ViewUserComponent } from '../admin-main/view-user/view-user.component';
import { AssignStudentComponent } from '../assign-student-main/assign-student/assign-student.component';
import { ViewUnverifiedUsersComponent } from '../admin-main/view-unverified-users/view-unverified-users.component';
import { SelfRegisterComponent } from '../self-register/self-register.component';
import { ViewStudentsComponent } from '../view-students/view-students.component';
import { ViewStudentsByCourseComponent } from '../view-students-by-course/view-students-by-course.component';
import { GradeBookEntryComponent } from '../grade-book-main/grade-book-entry/grade-book-entry.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    MainModule,
    AddAssignmentsComponent,
    AssignStudentComponent,
    AbsenceSubmitPageComponent,
    GradeBookEntryComponent,
    MainContentComponent,
    NavbarComponent,
    ProfilePageComponent,
    RegisterUserComponent,
    SelfRegisterComponent,
    ViewAssignmentsComponent,
    ViewStudentsComponent,
    ViewStudentsByCourseComponent,
    ViewUnverifiedUsersComponent,
    ViewUserComponent
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent implements OnInit{
  viewTab='home';
  userRole: string = '';
  userVerification: boolean = true;

  constructor(public smUserSvc: UserService,
    private router: Router){

  }
  ngOnInit(): void {
    if(this.smUserSvc.roleView=='main') {
      this.router.navigate(['/schoolManager/main']);
    } else {
      this.userRole = this.smUserSvc.getLoggedInUserRole()
      this.userVerification = this.smUserSvc.getLoggedInUserVerification();
    }
  }

  logout(){
    this.smUserSvc.logout();
  }

  setTabView(view: string){
    this.viewTab = view;
  }
}
