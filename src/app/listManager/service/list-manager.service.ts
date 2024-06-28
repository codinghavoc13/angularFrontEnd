import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ListInfoDto } from '../common/list-info-dto';
import { ListItemDto } from '../common/list-item-dto';

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

  getListItem(itemId: number){
    return this.httpClient.get<ListItemDto>(this.listUrl+"/item/"+itemId);
  }

  deleteItem(itemId: number){
    return this.httpClient.post<boolean>(this.listUrl+"/deleteItem/"+itemId,null);
  }

  updateItem(item: ListItemDto){
    return this.httpClient.post<ListItemDto>(this.listUrl+"/updateItem", item);
  }

  updateList(list: ListInfoDto){
    return this.httpClient.post<ListInfoDto>(this.listUrl+"/updateList",list);
  }
}
