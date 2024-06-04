import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PassphraseBody } from "../../common/passphrase-body";
import { PassphraseService } from "../../service/passphrase.service";

@Component({
  selector: 'app-passphrase',
  templateUrl: './passphrase.component.html',
  styleUrls: ['./passphrase.component.css']
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
