import { Injectable } from '@angular/core';
import { CipherBody } from '../common/cipher-body';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CaesarCipherService {
  cbInput = new CipherBody("temp",0,0,"UNK");
  cbOutput = new CipherBody("temp",0,0,"UNK");
  private baseUrl = environment.baseUrl+"/caesarCipher/process";

  constructor(private httpClient: HttpClient,
    private router: Router){
  }

  async processCB(cbInputParam: CipherBody) {
    console.log("Working with:" + this.baseUrl)
    this.httpClient.post<CipherBody>(this.baseUrl, cbInputParam).subscribe(
      data=>{
        this.cbOutput = data as CipherBody;
        this.router.navigate(['/cipher/caesarResult']);
      }
    )
  }
  
  buildCB(clearMsg: string, k1: number, k2: number, act: string){
    this.cbInput = new CipherBody(clearMsg,k1,k2,act);
    return this.cbInput;
  }
}

interface GetResponse{
  _embedded: {
    cipherBody: CipherBody;
  }
}
