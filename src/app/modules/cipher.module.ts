import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaesarCipherResultComponent } from 'src/app/components/cipher/caesar-cipher-result/caesar-cipher-result.component';
import { CaesarCipherComponent } from 'src/app/components/cipher/caesar-cipher/caesar-cipher.component';
import { CipherMainComponent } from 'src/app/components/cipher/cipher-main/cipher-main.component';
import { PassphraseComponent } from 'src/app/components/cipher/passphrase/passphrase.component';
import { CaesarexplainedComponent } from 'src/app/components/cipher/caesarexplained/caesarexplained.component';
import { RouterModule, Routes } from '@angular/router';
import { PassphraseResultComponent } from 'src/app/components/cipher/passphrase-result/passphrase-result.component';
import { PassphraseExplainedComponent } from 'src/app/components/cipher/passphrase-explained/passphrase-explained.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared.module';

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
