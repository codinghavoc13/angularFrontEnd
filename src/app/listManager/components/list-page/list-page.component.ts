import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UserService } from '../../service/user.service';
import { ListManagerService } from '../../service/list-manager.service';
import { ListInfoDto } from '../../common/list-info-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [
    CommonModule,
    ToastrModule
    // ToastrModule.forRoot({positionClass: 'toast-bottom-right'}),
    // ToastContainerModule
  ],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css'
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
