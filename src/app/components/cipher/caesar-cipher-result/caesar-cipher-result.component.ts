import { Component } from '@angular/core';
import { CipherBody } from '../../../common/cipher/cipher-body';
import { CaesarCipherService } from '../../../service/cipher/caesar-cipher.service';

@Component({
  selector: 'app-caesar-cipher-result',
  templateUrl: './caesar-cipher-result.component.html',
  styleUrls: ['./caesar-cipher-result.component.css']
})
export class CaesarCipherResultComponent {
  cbResult = this.ccService.cbOutput;
  constructor(private ccService: CaesarCipherService){

  }
  ngOnInit(): void {
    this.cbResult = this.ccService.cbOutput;
  }

}
