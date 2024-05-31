import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MainComponent } from './main/components/main.component';
import { NavComponent } from './main/components/nav/nav.component';
import { CipherModule } from './cipher/module/cipher.module';
import { MmdbModule } from './mmdb/module/mmdb.module';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: '**', component:MainComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MainComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    CipherModule,
    MmdbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
