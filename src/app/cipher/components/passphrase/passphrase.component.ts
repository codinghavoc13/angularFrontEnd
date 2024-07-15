import { Component } from '@angular/core';
import { PassphraseBody } from '../../common/passphrase-body';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PassphraseService } from '../../service/passphrase.service';
import { PassphraseExplainedComponent } from '../passphrase-explained/passphrase-explained.component';
import { CommonModule } from '@angular/common';
import { MainModule } from '../../../main/module/main/main.module';

@Component({
  selector: 'app-passphrase',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PassphraseExplainedComponent,
    MainModule
  ],
  templateUrl: './passphrase.component.html',
  styleUrl: './passphrase.component.css'
})
export class PassphraseComponent {
  showExplained = false;
  ppInput = new PassphraseBody("","");
  ppOutput = new PassphraseBody("","");

  passphraseForm = new FormGroup({
    message: new FormControl('',Validators.required),
    passphrase: new FormControl('',Validators.required)
  })

  constructor(private ppSvc: PassphraseService){}

  encrypt(){
    let temp = this.passphraseForm.value as PassphraseBody;
    this.ppSvc.encrypt(temp);
  }

  decrypt(){
    let temp = this.passphraseForm.value as PassphraseBody;
    this.ppSvc.decrypt(temp);
  }

  showExplanation(flag: boolean){
    this.showExplained = flag;
  }
}
