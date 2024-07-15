import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CipherBody } from '../../common/cipher-body';
import { CaesarCipherService } from '../../service/caesar-cipher.service';
import { CaesarExplainedComponent } from '../caesar-explained/caesar-explained.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-caesar-cipher',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CaesarExplainedComponent,
    RouterLink, RouterLinkActive, RouterOutlet
  ],
  templateUrl: './caesar-cipher.component.html',
  styleUrl: './caesar-cipher.component.css'
})
export class CaesarCipherComponent {
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
