import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { MainComponent } from './main/components/main.component';
import { NavComponent } from './main/components/nav/nav.component';
import { CipherModule } from './cipher/module/cipher.module';
import { MmdbModule } from './mmdb/module/mmdb.module';
import { SharedModule } from './shared.module';
import { SchoolManagerModule } from './schoolManager/module/school-manager.module';
import { TestModulesModule } from './main/modules/test-modules.module';


const routes: Routes = [
  {path: '', component: MainComponent},
  {path: '**', component:MainComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MainComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({positionClass:'toast-bottom-right'}),
    TestModulesModule,
    CipherModule,
    MmdbModule,
    SchoolManagerModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
