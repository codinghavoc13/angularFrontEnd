import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';

import { AddCourseComponent } from 'src/app/schoolManager/components/admin/add-course/add-course.component';
import { RegisterUserComponent } from 'src/app/schoolManager/components/admin/register-user/register-user.component';
import { ViewUnverifiedUsersComponent } from 'src/app/schoolManager/components/admin/view-unverified-users/view-unverified-users.component';
import { ViewUserTableComponent } from 'src/app/schoolManager/components/admin/view-user-table/view-user-table.component';
import { ViewUserComponent } from 'src/app/schoolManager/components/admin/view-user/view-user.component';
import { GradeBookSummaryComponent } from 'src/app/schoolManager/components/grade-book-main/grade-book-summary/grade-book-summary.component';
import { GradeEntryPopupComponent } from 'src/app/schoolManager/components/grade-book-main/grade-entry-popup/grade-entry-popup.component';
import { ViewAssignmentTableGroupComponent } from 'src/app/schoolManager/components/view-assignments-main/view-assignment-table-group/view-assignment-table-group.component';
import { ViewAssignmentsComponent } from 'src/app/schoolManager/components/view-assignments-main/view-assignments/view-assignments.component';
import { AbsenceSubmitPageComponent } from '../components/absence-submit-page/absence-submit-page.component';
import { SMAddAssignmentsComponent } from '../components/add-assignments/add-assignments.component';
import { SMLoginComponent } from '../components/login/login.component';
import { MainContentComponent } from '../components/main-content/main-content.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ProfilePageComponent } from '../components/profile-page/profile-page.component';
import { SMMainComponent } from '../components/school-manager-main/school-manager-main.component';
import { SelfRegisterComponent } from '../components/self-register/self-register.component';
import { UserPageComponent } from '../components/user-page/user-page.component';
import { ViewSelectedAssignmentsComponent } from '../components/view-selected-assignments/view-selected-assignments.component';
import { ViewStudentsByCourseComponent } from '../components/view-students-by-course/view-students-by-course.component';
import { ViewStudentsSubComponent } from '../components/view-students-sub/view-students-sub.component';
import { ViewStudentsTableComponent } from '../components/view-students-table/view-students-table.component';
import { ViewStudentsComponent } from '../components/view-students/view-students.component';
import { ViewAssignmentTableComponent } from 'src/app/scrub/view-assignment-table/view-assignment-table.component';
import { AssignStudentCoursesComponent } from '../components/assign-student-main/assign-student-courses/assign-student-courses.component';
import { AssignStudentComponent } from '../components/assign-student-main/assign-student/assign-student.component';
import { AssignStudentsCourseComponent } from '../components/assign-student-main/assign-students-course/assign-students-course.component';
import { GradeBookEntryComponent } from '../components/grade-book-main/grade-book-entry/grade-book-entry.component';

const routes: Routes = [
  {path: 'schoolManager/main', component: SMMainComponent},
  {path: 'schoolManager/login', component: SMLoginComponent},
  {path: 'schoolManager/userPage', component: UserPageComponent},
  // {path: 'schoolManager/register', component:SelfRegisterComponent},
  // {path: 'schoolManager/test', component:ParentComponent}
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
    GradeBookEntryComponent,
    GradeEntryPopupComponent,
    GradeBookSummaryComponent
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
