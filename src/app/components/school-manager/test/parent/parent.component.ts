import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent-test',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
// This is the home component in the video
export class ParentComponent implements OnInit{
  viewTab='home';
  roleFromParent='STAFF';

  setTabView(event: string){
    this.viewTab = event;
  }

  constructor(){}

  ngOnInit(): void {
  }

}
