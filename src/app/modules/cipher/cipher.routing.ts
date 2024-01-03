import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CaesarCipherResultComponent } from "src/app/components/cipher/caesar-cipher-result/caesar-cipher-result.component";
import { CaesarCipherComponent } from "src/app/components/cipher/caesar-cipher/caesar-cipher.component";
import { CipherMainComponent } from "src/app/components/cipher/cipher-main/cipher-main.component";
import { PassphraseResultComponent } from "src/app/components/cipher/passphrase-result/passphrase-result.component";
import { PassphraseComponent } from "src/app/components/cipher/passphrase/passphrase.component";

export const routes: Routes = [
    {path: 'caesar', component: CaesarCipherComponent},
    {path: 'caesarResult', component: CaesarCipherResultComponent},
    {path: 'passphrase', component:PassphraseComponent},
    {path: 'passphraseResult', component: PassphraseResultComponent},
    {path: 'cipher', component: CipherMainComponent},
  ];
  
export const cipherRouting: ModuleWithProviders<unknown> = RouterModule.forChild(routes);