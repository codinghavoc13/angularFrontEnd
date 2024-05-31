import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';
import { CaesarCipherResultComponent } from '../components/caesar-cipher-result/caesar-cipher-result.component';
import { CaesarCipherComponent } from '../components/caesar-cipher/caesar-cipher.component';
import { CaesarexplainedComponent } from '../components/caesarexplained/caesarexplained.component';
import { CipherMainComponent } from '../components/cipher-main/cipher-main.component';
import { PassphraseExplainedComponent } from '../components/passphrase-explained/passphrase-explained.component';
import { PassphraseResultComponent } from '../components/passphrase-result/passphrase-result.component';
import { PassphraseComponent } from '../components/passphrase/passphrase.component';

const routes: Routes = [
  {path: 'cipher', component: CipherMainComponent},
  {path: 'caesar', component: CaesarCipherComponent},
  {path: 'caesarResult', component: CaesarCipherResultComponent},
  {path: 'passphrase', component:PassphraseComponent},
  {path: 'passphraseResult', component: PassphraseResultComponent}
];

@NgModule({
  declarations: [
    CaesarCipherComponent,
    CaesarCipherResultComponent,
    CipherMainComponent,
    PassphraseComponent,
    PassphraseExplainedComponent,
    PassphraseResultComponent,
    CaesarexplainedComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule,
    CaesarCipherComponent,
    CaesarCipherResultComponent,
    CipherMainComponent,
    PassphraseComponent,
    PassphraseExplainedComponent,
    PassphraseResultComponent,
    CaesarexplainedComponent,
  ]
})
export class CipherModule { }