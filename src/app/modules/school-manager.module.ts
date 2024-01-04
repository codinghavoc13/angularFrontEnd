import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SMMainComponent } from '../components/school-manager/school-manager-main/school-manager-main.component';
import { SMAddAssignmentsComponent } from '../components/school-manager/add-assignments/add-assignments.component';
import { SMLoginComponent } from '../components/school-manager/login/login.component';
import { UserPageComponent } from '../components/school-manager/user-page/user-page.component';
import { NavbarComponent } from '../components/school-manager/navbar/navbar.component';
import { ProfilePageComponent } from '../components/school-manager/profile-page/profile-page.component';
import { AbsenceSubmitPageComponent } from '../components/school-manager/absence-submit-page/absence-submit-page.component';
import { RegisterUserComponent } from '../components/school-manager/register-user/register-user.component';
import { ViewAssignmentsComponent } from '../components/school-manager/view-assignments/view-assignments.component';
import { MainContentComponent } from '../components/school-manager/main-content/main-content.component';
import { ViewAssignmentTableComponent } from '../components/school-manager/view-assignment-table/view-assignment-table.component';
import { ViewUserComponent } from '../components/school-manager/view-user/view-user.component';
import { ViewUserTableComponent } from '../components/school-manager/view-user-table/view-user-table.component';
import { AssignStudentComponent } from '../components/school-manager/assign-student/assign-student.component';
import { SelfRegisterComponent } from '../components/school-manager/self-register/self-register.component';
import { ViewUnverifiedUsersComponent } from '../components/school-manager/view-unverified-users/view-unverified-users.component';
import { SharedModule } from './shared.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { EnrollStudentComponent } from '../components/school-manager/enroll-student/enroll-student.component';

const routes: Routes = [
  {path: 'schoolManager/main', component: SMMainComponent},
  {path: 'schoolManager/login', component: SMLoginComponent},
  {path: 'schoolManager/userPage', component: UserPageComponent},
  {path: 'schoolManager/enrollStudent', component: EnrollStudentComponent}
];

@NgModule({
  declarations: [
    SMMainComponent,
    SMAddAssignmentsComponent,
    SMLoginComponent,
    UserPageComponent,
    NavbarComponent,
    ProfilePageComponent,
    AbsenceSubmitPageComponent,
    RegisterUserComponent,
    ViewAssignmentsComponent,
    MainContentComponent,
    ViewAssignmentTableComponent,
    ViewUserComponent,
    ViewUserTableComponent,
    AssignStudentComponent,
    SelfRegisterComponent,
    ViewUnverifiedUsersComponent,
    EnrollStudentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BsDropdownModule,
    SharedModule
  ],
  exports:[
    SMMainComponent,
    SMAddAssignmentsComponent,
    SMLoginComponent,
    UserPageComponent,
    NavbarComponent,
    ProfilePageComponent,
    AbsenceSubmitPageComponent,
    RegisterUserComponent,
    ViewAssignmentsComponent,
    MainContentComponent,
    ViewAssignmentTableComponent,
    ViewUserComponent,
    ViewUserTableComponent,
    AssignStudentComponent,
    SelfRegisterComponent,
    ViewUnverifiedUsersComponent
  ]
})
export class SchoolManagerModule { }
