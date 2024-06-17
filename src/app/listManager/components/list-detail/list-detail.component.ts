import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListInfoDto } from '../../common/list-info-dto';
import { ListManagerService } from '../../service/list-manager.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit{
  @Input() listId: number = -1;
  @Output() returnEmit = new EventEmitter<number>();
  listInfo: ListInfoDto = new ListInfoDto(false,[],-1,-1,-1,'','');

  constructor(private listSvc: ListManagerService,
    private router: Router,
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

  returnToMainPage(){
    this.returnEmit.emit(-1);
  }

}
