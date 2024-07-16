import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignStudentCoursesComponent } from '../../components/assign-student-main/assign-student-courses/assign-student-courses.component';
import { AssignStudentsCourseComponent } from '../../components/assign-student-main/assign-students-course/assign-students-course.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ViewStudentsSubComponent } from '../../components/view-students-sub/view-students-sub.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewAssignmentTableGroupComponent } from '../../components/view-assignments-main/view-assignment-table-group/view-assignment-table-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewStudentsTableComponent } from '../../components/view-students-table/view-students-table.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MainContentComponent } from '../../components/main-content/main-content.component';
import { AddAssignmentsComponent } from '../../components/add-assignments/add-assignments.component';
import { AbsenceSubmitPageComponent } from '../../components/absence-submit-page/absence-submit-page.component';
import { ProfilePageComponent } from '../../components/profile-page/profile-page.component';
import { ViewAssignmentsComponent } from '../../components/view-assignments-main/view-assignments/view-assignments.component';
import { RegisterUserComponent } from '../../components/admin-main/register-user/register-user.component';
import { ViewUserComponent } from '../../components/admin-main/view-user/view-user.component';
import { AssignStudentComponent } from '../../components/assign-student-main/assign-student/assign-student.component';
import { ViewUnverifiedUsersComponent } from '../../components/admin-main/view-unverified-users/view-unverified-users.component';
import { SelfRegisterComponent } from '../../components/self-register/self-register.component';
import { ViewStudentsComponent } from '../../components/view-students/view-students.component';
import { ViewStudentsByCourseComponent } from '../../components/view-students-by-course/view-students-by-course.component';
import { GradeBookEntryComponent } from '../../components/grade-book-main/grade-book-entry/grade-book-entry.component';

@NgModule({
  declarations: [],
  imports: [
    //external
    FormsModule,
    NgxPaginationModule,
    NgbAccordionModule,
    ReactiveFormsModule,
    //internal
    AbsenceSubmitPageComponent,
    AddAssignmentsComponent,
    AssignStudentComponent,
    AssignStudentCoursesComponent,
    AssignStudentsCourseComponent,
    GradeBookEntryComponent,
    MainContentComponent,
    NavbarComponent,
    ProfilePageComponent,
    RegisterUserComponent,
    SelfRegisterComponent,
    ViewAssignmentTableGroupComponent,
    ViewAssignmentsComponent,
    ViewStudentsComponent,
    ViewStudentsByCourseComponent,
    ViewStudentsSubComponent,
    ViewStudentsTableComponent,
    ViewUnverifiedUsersComponent,
    ViewUserComponent
  ],
  exports: [
    //external
    FormsModule,
    NgxPaginationModule,
    NgbAccordionModule,
    ReactiveFormsModule,
    //internal
    AbsenceSubmitPageComponent,
    AddAssignmentsComponent,
    AssignStudentComponent,
    AssignStudentCoursesComponent,
    AssignStudentsCourseComponent,
    GradeBookEntryComponent,
    MainContentComponent,
    NavbarComponent,
    ProfilePageComponent,
    RegisterUserComponent,
    SelfRegisterComponent,
    ViewAssignmentTableGroupComponent,
    ViewAssignmentsComponent,
    ViewStudentsComponent,
    ViewStudentsByCourseComponent,
    ViewStudentsSubComponent,
    ViewStudentsTableComponent,
    ViewUnverifiedUsersComponent,
    ViewUserComponent
  ]
})
export class SchoolManagerModule { }
