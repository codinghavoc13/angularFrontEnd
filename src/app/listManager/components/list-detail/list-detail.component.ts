import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ListManagerService } from '../../service/list-manager.service';
import { ListItem } from '../../common/enum/list-item';
import { ListInfoDto } from '../../common/list-info-dto';
import { Display } from '../../common/enum/display';
import { EditItemPopupComponent } from '../edit-item-popup/edit-item-popup.component';
import { ConfirmDeletePopupComponent } from '../confirm-delete-popup/confirm-delete-popup.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-detail',
  standalone: true,
  imports: [
    CommonModule,
    EditItemPopupComponent,
    ConfirmDeletePopupComponent
  ],
  templateUrl: './list-detail.component.html',
  styleUrl: './list-detail.component.css'
})
export class ListDetailComponent implements OnInit{
  @Input() listId: number = -1;
  @Output() returnEmit = new EventEmitter<number>();
  @Output() displayEmit = new EventEmitter<Display>();
  listInfo: ListInfoDto = new ListInfoDto(false,[],-1,-1,-1,'','');
  tgt: ListItem = ListItem.ITEM;

  showEdit: boolean = false;

  constructor(private listSvc: ListManagerService,
    // private router: Router,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.buildList();
  }

  buildList(){
    if(this.listId == -1){
      this.toastr.error("Invalid list ID number");
    } else {
      this.listSvc.buildList(this.listId).subscribe(
        data => {
          this.listInfo = data;
        }
      )
    }
  }

  editListItems(){
    this.displayEmit.emit(Display.EDIT_LIST_ITEMS);
  }

  returnToMainPage(){
    this.returnEmit.emit(-1);
  }

  setEditShowTrue(){
    this.showEdit = true;
  }

  showEditComp(){
    return this.showEdit;
  }
}
