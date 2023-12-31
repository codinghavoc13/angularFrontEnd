import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterDto } from 'src/app/common/school-manager/register-dto';
import { convertToObject } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = "http://localhost:8080";
  usernameCheck: boolean = true;
  // usernames: string[] = [];

  constructor(private httpClient: HttpClient) { }

  registerStudent(dto: RegisterDto){
    console.log('user-svc-1');
    console.log(dto);
  }

  async checkUsername(tempUser: RegisterDto){
    // console.log('us-svc-1');
    // console.log(tempUser.username);
    // console.log('us-svc-2');
    // console.log(this.baseUrl+"/user/checkUsername");

    return await this.httpClient.post<boolean>(this.baseUrl+"/user/checkUsername", tempUser).subscribe(
      data=>{
        console.log('us-svc-3');
        console.log(data);
        console.log('us-svc-4');
        this.usernameCheck = data.valueOf();
      }
    );
  }
}
