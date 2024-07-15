import { Injectable } from '@angular/core';
import { PassphraseBody } from '../common/passphrase-body';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PassphraseService {
  ppInput = new PassphraseBody("","");
  ppOutput = new PassphraseBody("","");
  private encryptUrl = environment.baseUrl+"/passphraseCipher/encrypt";
  private decryptUrl = environment.baseUrl+"/passphraseCipher/decrypt";

  constructor(private httpClient: HttpClient,
    private router: Router
    ) { }

  async encrypt(pp: PassphraseBody){
    this.httpClient.post<PassphraseBody>(this.encryptUrl, pp).subscribe(
      data=>{
        this.ppOutput = data as PassphraseBody;
        this.router.navigate(['/cipher/passphraseResult']);
      }
    )
  }

  async decrypt(pp: PassphraseBody){
    this.httpClient.post<PassphraseBody>(this.decryptUrl, pp).subscribe(
      data=>{
        this.ppOutput = data as PassphraseBody;
        this.router.navigate(['/cipher/passphraseResult']);
      }
    )
  }
}
