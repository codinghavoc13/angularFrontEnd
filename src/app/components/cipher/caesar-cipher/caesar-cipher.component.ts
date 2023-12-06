import { Component, OnInit } from '@angular/core';
import { CipherBody } from '../../../common/cipher-body';
import { CaesarCipherService } from '../../../service/caesar/caesar-cipher.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-caesar-cipher',
  templateUrl: './caesar-cipher.component.html',
  styleUrls: ['./caesar-cipher.component.css']
})

export class CaesarCipherComponent{
  keySelect = "1K";
  showExplained = false;
  cbInput: CipherBody | undefined;
  // cbInput = new CipherBody("temp",0,0,"E1K");

  caesarForm = new FormGroup({
    message: new FormControl('', Validators.required),
    keyOne: new FormControl('0',[Validators.min(0), Validators.max(62), Validators.required]),
    keyTwo: new FormControl('0',[Validators.min(0), Validators.max(62)]),
    action: new FormControl('E1K',Validators.required)
  })

  constructor(private ccService: CaesarCipherService){

  }

  onSubmit(){
    let temp = this.caesarForm.value as unknown as CipherBody;
    this.ccService.processCB(temp);
  }

  updateKey(input: string){
    this.keySelect = input;
    if(input==='1K') this.caesarForm.controls['action'].setValue('E1K');
    if(input==='2K') this.caesarForm.controls['action'].setValue('E2K');    
  }

  showExplanation(flag: boolean){
    this.showExplained = flag;
  }
}