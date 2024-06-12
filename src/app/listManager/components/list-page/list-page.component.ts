import { Component, OnInit } from '@angular/core';
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
  lists: ListInfoDto[] = [];

  constructor(private listSvc: ListManagerService,
    private userSvc: UserService,
    private router: Router
  ){}

  ngOnInit(): void {
    if(!this.userSvc.loggedIn){
      this.router.navigate(['listManager']);
    }
    this.buildList();
  }

  buildList(){
    this.listSvc.buildList(this.userSvc.userId).subscribe(
      data => {
        this.lists = data;
        console.log(this.lists);
      }
    )
  }

  checkUser(){
    return this.userSvc.currentUser$;
  }

  viewList(listId: number){
    console.log(listId);
  }

}
