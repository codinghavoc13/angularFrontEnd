import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './shared.module';

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
import { ViewStudentsComponent } from '../components/school-manager/view-students/view-students.component';
import { ViewStudentsSubComponent } from '../components/school-manager/view-students-sub/view-students-sub.component';
import { AssignStudentsCourseComponent } from '../components/school-manager/assign-students-course/assign-students-course.component';
import { AssignStudentCoursesComponent } from '../components/school-manager/assign-student-courses/assign-student-courses.component';
import { ParentComponent } from '../components/school-manager/test/parent/parent.component';
import { AddCourseComponent } from '../components/school-manager/add-course/add-course.component';
import { ViewSelectedAssignmentsComponent } from '../components/school-manager/view-selected-assignments/view-selected-assignments.component';
import { ViewStudentsTableComponent } from '../components/school-manager/view-students-table/view-students-table.component';
import { ViewStudentsByCourseComponent } from '../components/school-manager/view-students-by-course/view-students-by-course.component';
import { ViewAssignmentTableGroupComponent } from '../components/school-manager/view-assignment-table-group/view-assignment-table-group.component';
import { GradeBookComponent } from '../components/school-manager/grade-book/grade-book.component';

const routes: Routes = [
  {path: 'schoolManager/main', component: SMMainComponent},
  {path: 'schoolManager/login', component: SMLoginComponent},
  {path: 'schoolManager/userPage', component: UserPageComponent},
  {path: 'schoolManager/register', component:SelfRegisterComponent},
  {path: 'schoolManager/test', component:ParentComponent}
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
    ViewStudentsComponent,
    ViewStudentsSubComponent,
    AssignStudentsCourseComponent,
    AssignStudentCoursesComponent,
    AddCourseComponent,
    ViewSelectedAssignmentsComponent,
    ViewStudentsTableComponent,
    ViewStudentsByCourseComponent,
    ViewAssignmentTableGroupComponent,
    GradeBookComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
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
