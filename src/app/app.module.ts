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
import { StudentPageComponent } from './components/school-manager/student-page/student-page.component';
import { StaffPageComponent } from './components/school-manager/staff-page/staff-page.component';
import { ParentPageComponent } from './components/school-manager/parent-page/parent-page.component';
import { NavbarComponent } from './components/school-manager/navbar/navbar.component';

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
  {path: 'schoolManager/addAssignment', component:SMAddAssignmentsComponent},
  {path: '', component: MainComponent},
  {path: '**', component:CipherMainComponent}
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
    StudentPageComponent,
    StaffPageComponent,
    ParentPageComponent,
    NavbarComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
