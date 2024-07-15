import { Component } from '@angular/core';
import { CaesarCipherService } from '../../service/caesar-cipher.service';
import { CommonModule } from '@angular/common';
import { MainModule } from '../../../main/module/main/main.module';

@Component({
  selector: 'app-caesar-cipher-result',
  standalone: true,
  imports: [
    CommonModule,
    MainModule
  ],
  templateUrl: './caesar-cipher-result.component.html',
  styleUrl: './caesar-cipher-result.component.css'
})
export class CaesarCipherResultComponent {
  cbResult = this.ccService.cbOutput;
  constructor(private ccService: CaesarCipherService){

  }
  ngOnInit(): void {
    this.cbResult = this.ccService.cbOutput;
  }

}
