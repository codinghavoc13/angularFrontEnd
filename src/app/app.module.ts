import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MainComponent } from './components/main/main.component';
import { NavComponent } from './components/main/nav/nav.component';

import { CaesarCipherComponent } from './components/cipher/caesar-cipher/caesar-cipher.component';
import { CaesarCipherResultComponent } from './components/cipher/caesar-cipher-result/caesar-cipher-result.component';
import { CipherMainComponent } from './components/cipher/cipher-main/cipher-main.component';
import { PassphraseComponent } from './components/cipher/passphrase/passphrase.component';
import { CaesarexplainedComponent } from './components/cipher/caesarexplained/caesarexplained.component';

import { MovieDisplayComponent } from './components/mmdb/movie-display/movie-display.component';
import { MmdbMainComponent } from './components/mmdb/mmdb-main/mmdb-main.component';
import { ActorListComponent } from './components/mmdb/actor-list/actor-list.component';
import { ActorDisplayComponent } from './components/mmdb/actor-display/actor-display.component';
import { MovieListComponent } from './components/mmdb/movie-list/movie-list.component';
import { PassphraseResultComponent } from './components/cipher/passphrase-result/passphrase-result.component';
import { PassphraseExplainedComponent } from './components/cipher/passphrase-explained/passphrase-explained.component';
import { SMMainComponent } from './components/school-manager/school-manager-main/school-manager-main.component';
import { SMAddAssignmentsComponent } from './components/school-manager/add-assignments/add-assignments.component';
import { SMLoginComponent } from './components/school-manager/login/login.component';
import { UserPageComponent } from './components/school-manager/user-page/user-page.component';
import { NavbarComponent } from './components/school-manager/navbar/navbar.component';
import { ProfilePageComponent } from './components/school-manager/profile-page/profile-page.component';
import { AbsenceSubmitPageComponent } from './components/school-manager/absence-submit-page/absence-submit-page.component';
import { DynamicAddTestComponent } from './dynamic-add-test/dynamic-add-test.component';
import { RegisterUserComponent } from './components/school-manager/register-user/register-user.component';
import { ViewAssignmentsComponent } from './components/school-manager/view-assignments/view-assignments.component';
//test
import { ChildComponent as CCTest } from './components/school-manager/test/child/child.component';
import { ParentComponent as PCTest } from './components/school-manager/test/parent/parent.component';
import { NavComponent as NCTest } from './components/school-manager/test/nav/nav.component';
import { ToastrModule } from 'ngx-toastr';
import { MainContentComponent } from './components/school-manager/main-content/main-content.component';
import { ViewAssignmentTableComponent } from './components/school-manager/view-assignment-table/view-assignment-table.component';
import { ViewUserComponent } from './components/school-manager/view-user/view-user.component';
import { ViewUserTableComponent } from './components/school-manager/view-user-table/view-user-table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AssignStudentComponent } from './components/school-manager/assign-student/assign-student.component';
import { SelfRegisterComponent } from './components/school-manager/self-register/self-register.component';
import { ViewUnverifiedUsersComponent } from './components/school-manager/view-unverified-users/view-unverified-users.component';

const routes: Routes = [
  {path: 'caesar', component: CaesarCipherComponent},
  {path: 'caesarResult', component: CaesarCipherResultComponent},
  {path: 'passphrase', component:PassphraseComponent},
  {path: 'passphraseResult', component: PassphraseResultComponent},
  {path: 'cipher', component: CipherMainComponent},
  {path: 'mmdb', component: MmdbMainComponent},
  {path: 'mmdb/movie-display', component: MovieDisplayComponent},
  {path: 'mmdb/actor-display', component: ActorDisplayComponent},
  {path: 'schoolManager/main', component: SMMainComponent},
  {path: 'schoolManager/login', component: SMLoginComponent},
  {path: 'schoolManager/userPage', component: UserPageComponent},
  {path: 'schoolManager/registerUser', component:RegisterUserComponent},
  {path: 'schoolManager/selfRegister', component:SelfRegisterComponent},
  {path: 'schoolManager/viewUnverifiedUsers', component:ViewUnverifiedUsersComponent},
  {path: 'test/dat',component:DynamicAddTestComponent},
  {path: 'test/parent', component:PCTest},
  // {path: 'schoolManager/addAssignment', component:SMAddAssignmentsComponent},
  {path: '', component: MainComponent},
  {path: '**', component:MainComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CaesarCipherComponent,
    CaesarCipherResultComponent,
    CipherMainComponent,
    PassphraseComponent,
    NavComponent,
    MainComponent,
    CaesarexplainedComponent,
    MovieDisplayComponent,
    MmdbMainComponent,
    ActorListComponent,
    ActorDisplayComponent,
    MovieListComponent,
    PassphraseResultComponent,
    PassphraseExplainedComponent,
    SMMainComponent,
    SMAddAssignmentsComponent,
    SMLoginComponent,
    UserPageComponent,
    NavbarComponent,
    ProfilePageComponent,
    AbsenceSubmitPageComponent,
    DynamicAddTestComponent,
    RegisterUserComponent,
    ViewAssignmentsComponent,
    CCTest,
    PCTest,
    NCTest,
    MainContentComponent,
    ViewAssignmentTableComponent,
    ViewUserComponent,
    ViewUserTableComponent,
    AssignStudentComponent,
    SelfRegisterComponent,
    ViewUnverifiedUsersComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({positionClass:'toast-bottom-right'}),
    BrowserAnimationsModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
