import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ListInfoDto } from '../../common/list-info-dto';
import { ListManagerService } from '../../service/list-manager.service';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit{
  @Output() listToEmit = new EventEmitter<ListInfoDto>();
  lists: ListInfoDto[] = [];

  constructor(private listSvc: ListManagerService,
    private userSvc: UserService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.buildList();
  }

  buildList(){
    this.listSvc.buildLists(this.userSvc.userId).subscribe(
      data => {
        this.lists = data;
      }
    )
  }

  checkUser(){
    return this.userSvc.currentUser$;
  }

  sendToEdit(list: ListInfoDto){
    this.listToEmit.emit(list);
  }

  viewList(listId: number){
    this.listSvc.listDetailDisplay = listId;
    this.router.navigate(['listManager/listDetail'])
  }

}
