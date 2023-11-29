import { Component, OnInit } from '@angular/core';
import { CipherBody } from '../../common/cipher-body';
import { CaesarCipherService } from '../../service/caesar/caesar-cipher.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-caesar-cipher',
  templateUrl: './caesar-cipher.component.html',
  styleUrls: ['./caesar-cipher.component.css']
})

export class CaesarCipherComponent implements OnInit{
  cbInput: CipherBody | undefined;

  caesarForm = new FormGroup({
    message: new FormControl(),
    keyOne: new FormControl(),
    keyTwo: new FormControl(),
    action: new FormControl()
  })

  constructor(private ccService: CaesarCipherService,
    private route: ActivatedRoute,
    private router: Router){

  }
  ngOnInit(): void {
    console.log("working with: " + environment.baseUrl);
    console.log("production is: " + environment.production);
  }
  
  // Need to figure out how to get the form on the html page to pass these values
  // and to do so without blasting it on the url path
  buildCB(msg: string, k1: number, k2: number, action: string){
    this.cbInput = this.ccService.buildCB(msg,k1,k2,action);
    // console.log("cc1");
    // console.log(this.cbInput);
    this.ccService.processCB(this.cbInput);
    // this.router.navigate(['/caesarResult']);
  }

  onSubmit(){
    const formValues = this.caesarForm.value;
    this.buildCB(formValues.message,
      formValues.keyOne,
      formValues.keyTwo, 
      formValues.action);
  }
}
