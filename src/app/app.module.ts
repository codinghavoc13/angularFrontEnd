import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';

import { MainComponent } from './components/main/main.component';
import { NavComponent } from './components/main/nav/nav.component';

import { TestModulesModule } from './modules/test-modules.module';
import { CipherModule } from './modules/cipher.module';
import { SharedModule } from './modules/shared.module';
import { MmdbModule } from './modules/mmdb.module';
import { SchoolManagerModule } from './modules/school-manager.module';

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
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
