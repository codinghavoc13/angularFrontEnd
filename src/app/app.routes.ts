import { Routes } from '@angular/router';
import { MainComponent } from './main/components/main/main.component';
import { CipherMainComponent } from './cipher/components/cipher-main/cipher-main.component';
import { MmdbMainComponent } from './mmdb/components/mmdb-main/mmdb-main.component';
import { CaesarCipherComponent } from './cipher/components/caesar-cipher/caesar-cipher.component';
import { CaesarCipherResultComponent } from './cipher/components/caesar-cipher-result/caesar-cipher-result.component';
import { PassphraseComponent } from './cipher/components/passphrase/passphrase.component';
import { PassphraseResultComponent } from './cipher/components/passphrase-result/passphrase-result.component';
import { MovieDisplayComponent } from './mmdb/components/movie-display/movie-display.component';
import { ActorDisplayComponent } from './mmdb/components/actor-display/actor-display.component';
import { SchoolManagerMainComponent } from './schoolManager/components/school-manager-main/school-manager-main.component';
import { LoginComponent } from './schoolManager/components/login/login.component';
import { UserPageComponent } from './schoolManager/components/user-page/user-page.component';

export const routes: Routes = [
    {path: '', component: MainComponent},
    {path: 'cipher', component: CipherMainComponent},
    {path: 'cipher/caesar', component: CaesarCipherComponent},
    {path: 'cipher/caesarResult', component: CaesarCipherResultComponent},
    {path: 'cipher/passphrase', component:PassphraseComponent},
    {path: 'cipher/passphraseResult', component: PassphraseResultComponent},
    {path: 'mmdb', component: MmdbMainComponent},
    {path: 'mmdb/movie-display', component: MovieDisplayComponent},
    {path: 'mmdb/actor-display', component: ActorDisplayComponent},
    {path: 'schoolManager', component: SchoolManagerMainComponent},
    {path: 'schoolManager/login', component: LoginComponent},
    {path: 'schoolManager/userPage', component: UserPageComponent},
    {path: '**', component:MainComponent}];
