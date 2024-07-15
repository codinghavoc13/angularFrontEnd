import { Component } from '@angular/core';
import { PassphraseService } from '../../service/passphrase.service';
import { CommonModule } from '@angular/common';
import { MainModule } from '../../../main/module/main/main.module';

@Component({
  selector: 'app-passphrase-result',
  standalone: true,
  imports: [
    CommonModule,
    MainModule
  ],
  templateUrl: './passphrase-result.component.html',
  styleUrl: './passphrase-result.component.css'
})
export class PassphraseResultComponent {
  ppResult = this.ppSvc.ppOutput;

  constructor(private ppSvc: PassphraseService){}

  ngOnInit(): void{
    this.ppResult = this.ppSvc.ppOutput;
  }

}
