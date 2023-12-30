import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nav-test',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
// This is the register component in the video
export class NavComponent implements OnInit{
  viewTab='home';
  @Input() roleInNav='STUDENT';
  @Output() viewTabTest = new EventEmitter();

  setTabView(view: string){
    this.viewTab = view;
    this.viewTabTest.emit(view);
  }
  constructor(){}

  ngOnInit(): void {
  }

}
