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

const routes: Routes = [
  {path: 'caesar', component: CaesarCipherComponent},
  {path: 'caesarResult', component: CaesarCipherResultComponent},
  {path: 'passphrase', component:PassphraseComponent},
  {path: '', component: CipherMainComponent},
  {path: '**', component:CipherMainComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CaesarCipherComponent,
    CaesarCipherResultComponent,
    CipherMainComponent,
    PassphraseComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
