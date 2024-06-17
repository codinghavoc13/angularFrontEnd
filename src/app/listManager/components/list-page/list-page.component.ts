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
  @Output() listToEmit = new EventEmitter<number>();
  //need a separate emitter; the one above sends to view, need another
  //to take to edit
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

  sendToEdit(listId: number){
    this.listToEmit.emit(listId);
  }

  viewList(listId: number){
    this.listToEmit.emit(listId);
    // this.listSvc.listDetailDisplay = listId;
    // this.router.navigate(['listManager/listDetail'])
  }

}
