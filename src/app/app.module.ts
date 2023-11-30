import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CaesarCipherComponent } from './components/caesar-cipher/caesar-cipher.component';
import { CaesarCipherResultComponent } from './components/caesar-cipher-result/caesar-cipher-result.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { CaesarCipherService } from './service/caesar/caesar-cipher.service';
import { RouterModule, Routes } from '@angular/router';
import { CipherMainComponent } from './components/cipher-main/cipher-main.component';
import { PassphraseComponent } from './components/passphrase/passphrase.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './components/nav/nav.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {path: 'caesar', component: CaesarCipherComponent},
  {path: 'caesarResult', component: CaesarCipherResultComponent},
  {path: 'passphrase', component:PassphraseComponent},
  {path: 'cipher', component: CipherMainComponent},
  {path: '/', component: MainComponent},
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
    MainComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
