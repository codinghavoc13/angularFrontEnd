import { Component } from '@angular/core';
import { CipherBody } from '../../common/cipher-body';
import { CaesarCipherService } from '../../service/caesar/caesar-cipher.service';

@Component({
  selector: 'app-caesar-cipher-result',
  templateUrl: './caesar-cipher-result.component.html',
  styleUrls: ['./caesar-cipher-result.component.css']
})
export class CaesarCipherResultComponent {
  cbResult = new CipherBody("temp",0,0,"UNK");
  constructor(private ccService: CaesarCipherService){

  }
  ngOnInit(): void {
    // this.getCipherBody();
    // this.cbResult = this.ccService.cbOutput;
    // this.ccService.processCB();
    this.cbResult = this.ccService.cbOutput;
  }

  // getCipherBody(){
  //   this.ccService.getProcessedBody().subscribe(
  //     data=>{
  //       this.cbResult = data as CipherBody;
  //     }
  //   )
  // }

}
