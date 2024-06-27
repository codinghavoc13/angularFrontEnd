import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ListInfoDto } from '../common/list-info-dto';

@Injectable({
  providedIn: 'root'
})
export class ListManagerService {
  listUrl = "http://localhost:8080/listManager/list";
  listDetailDisplay: number = -1;

  constructor(private httpClient: HttpClient,
    private toastr: ToastrService) { }

  buildList(listId: number){
    return this.httpClient.get<ListInfoDto>(this.listUrl+"/list/"+listId);
  }

  buildLists(userId: number){
    return this.httpClient.get<ListInfoDto[]>(this.listUrl+"/user/"+userId);
  }

  deleteItem(itemId: number){
    return this.httpClient.post<boolean>(this.listUrl+"/deleteItem/"+itemId,null);
  }

  updateList(list: ListInfoDto){
    return this.httpClient.post<ListInfoDto>(this.listUrl+"/updateList",list);
  }
}
