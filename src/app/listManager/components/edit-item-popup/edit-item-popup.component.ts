import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, inject } from '@angular/core';
import { ListManagerService } from '../../service/list-manager.service';
import { ToastrService } from 'ngx-toastr';
import { ListItemDto } from '../../common/list-item-dto';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-item-popup',
  templateUrl: './edit-item-popup.component.html',
  styleUrls: ['./edit-item-popup.component.css']
})
export class EditItemPopupComponent implements OnInit {
  @Input() itemIdToEdit: number = 0;
  @Output() refreshEmit = new EventEmitter<boolean>();
  editResult = '';
  itemDto: ListItemDto = new ListItemDto(0,0,'',0,'');
  modalSvc = inject(NgbModal);


  ngOnInit(): void {
    // if(this.itemIdToEdit>0){
    //   //in the subscribe, need to check if itemId is -1 which says that the
    //   //back end didn't find that item, otherwise, proceed
    //   this.listSvc.getListItem(this.itemIdToEdit).subscribe(
    //     data => {
    //       if(data.listItemId == -1){
    //         this.toastr.error('Unable to find a matching item');
    //       } else {
    //         this.itemDto = data;
    //       }
    //     }
    //   )
    // }
  }

  constructor(public listSvc: ListManagerService,
    private toastr: ToastrService
  ){}

  showEditForm(content: TemplateRef<any>){
    this.listSvc.getListItem(this.itemIdToEdit).subscribe(
      data=>{
        this.itemDto = data;
        this.modalSvc.open(content).result.then(
          (result) => {
            this.editResult = result;
            if(this.editResult ==='save'){
              console.log('Saving changes')
              this.listSvc.updateItem(this.itemDto).subscribe(
                data =>{
                  this.toastr.success('Item updated');
                  this.refreshEmit.emit(true);
                }
              );
            } else {
              console.log('do nothing')
            }
          }
        )
      }
    )
  }

  submit(){
    //new version will only need to save one single item and save
    //we have the listId being saved locally
    //take that value, add to the 
  }

}
