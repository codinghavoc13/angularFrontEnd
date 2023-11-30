import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CipherBody } from '../../common/cipher-body';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

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
    this.httpClient.post<CipherBody>(this.baseUrl, cbInputParam).subscribe(
      data=>{
        this.cbOutput = data as CipherBody;
        this.router.navigate(['/caesarResult']);
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