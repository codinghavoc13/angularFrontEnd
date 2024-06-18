import { Component, EventEmitter, OnInit, Output, ɵisEnvironmentProviders } from '@angular/core';
import { ListInfoDto } from '../../common/list-info-dto';
import { ListManagerService } from '../../service/list-manager.service';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit{
  @Output() listToViewEmit = new EventEmitter<number>();
  //need a separate emitter; the one above sends to view, need another
  //to take to edit
  @Output() listToEditEmit = new EventEmitter<number>();
  lists: ListInfoDto[] = [];

  constructor(private listSvc: ListManagerService,
    private userSvc: UserService,
    private router: Router,
    private toastr: ToastrService
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

  deleteList(listId: number){
    this.toastr.info('Still in development')
  }

  sendToEdit(listId: number){
    this.listToEditEmit.emit(listId);
  }

  viewList(listId: number){
    this.listToViewEmit.emit(listId);
    // this.listSvc.listDetailDisplay = listId;
    // this.router.navigate(['listManager/listDetail'])
  }

}
