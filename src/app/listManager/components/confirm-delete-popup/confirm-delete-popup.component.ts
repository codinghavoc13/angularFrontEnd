import { Component, EventEmitter, Input, Output, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListManagerService } from '../../service/list-manager.service';
import { ToastrService } from 'ngx-toastr';
import { ListItem } from '../../common/enum/list-item';

@Component({
  selector: 'app-confirm-delete-popup',
  templateUrl: './confirm-delete-popup.component.html',
  styleUrls: ['./confirm-delete-popup.component.css']
})
export class ConfirmDeletePopupComponent {
  modalSvc = inject(NgbModal);
  confirmResult = '';
  @Input() itemId: number = -1;
  @Input() tgt: ListItem = ListItem.LIST;
  @Output() refreshEmit = new EventEmitter<boolean>();
  
  constructor(private listSvc: ListManagerService,
    private toastr: ToastrService
  ){}

  confirmDelete(content: TemplateRef<any>){
    this.modalSvc.open(content).result.then(
      (result) =>{
        this.confirmResult = result;
        if(this.confirmResult =='delete'){
          if(this.tgt === ListItem.ITEM){
            this.listSvc.deleteItem(this.itemId).subscribe(
              data => {
                if(data){
                  this.toastr.info('Successfully deleted item');
                  //need to have an emit that calls back to originating component to refresh
                  this.refreshEmit.emit(data);
                }
              }
            );
          }
          if(this.tgt === ListItem.LIST){

          }
        }
      }
    );
  }
}
