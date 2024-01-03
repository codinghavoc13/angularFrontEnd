import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaesarCipherResultComponent } from 'src/app/components/cipher/caesar-cipher-result/caesar-cipher-result.component';
import { CaesarCipherComponent } from 'src/app/components/cipher/caesar-cipher/caesar-cipher.component';
import { CipherMainComponent } from 'src/app/components/cipher/cipher-main/cipher-main.component';
import { PassphraseComponent } from 'src/app/components/cipher/passphrase/passphrase.component';
import { CaesarexplainedComponent } from 'src/app/components/cipher/caesarexplained/caesarexplained.component';
import { RouterModule, Routes } from '@angular/router';
import { PassphraseResultComponent } from 'src/app/components/cipher/passphrase-result/passphrase-result.component';
import { cipherRouting } from './cipher.routing';

@NgModule({
  declarations: [
    CaesarCipherComponent,
    CaesarCipherResultComponent,
    CipherMainComponent,
    PassphraseComponent,
    CaesarexplainedComponent,
    cipherRouting
  ],
  imports: [
    // RouterModule.forRoot(routes),
    CommonModule,
    CaesarCipherComponent,
    CaesarCipherResultComponent,
    CipherMainComponent,
    PassphraseComponent,
    CaesarexplainedComponent
  ]
})
export class CipherModule { }
