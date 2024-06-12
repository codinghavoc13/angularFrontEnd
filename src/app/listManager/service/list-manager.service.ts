import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ListInfoDto } from '../common/list-info-dto';

@Injectable({
  providedIn: 'root'
})
export class ListManagerService {
  listUrl = "http://localhost:8080/listManager/list";

  constructor(private httpClient: HttpClient,
    private toastr: ToastrService) { }

  buildList(userId: number){
    return this.httpClient.get<ListInfoDto[]>(this.listUrl+"/user/"+userId);
  }
}
