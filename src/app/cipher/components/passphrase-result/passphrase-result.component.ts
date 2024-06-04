import { Component } from '@angular/core';
import { PassphraseService } from '../../service/passphrase.service';

@Component({
  selector: 'app-passphrase-result',
  templateUrl: './passphrase-result.component.html',
  styleUrls: ['./passphrase-result.component.css']
})
export class PassphraseResultComponent {
  ppResult = this.ppSvc.ppOutput;

  constructor(private ppSvc: PassphraseService){}

  ngOnInit(): void{
    this.ppResult = this.ppSvc.ppOutput;
  }

}
