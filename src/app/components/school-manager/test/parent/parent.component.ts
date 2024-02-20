import { Component, OnInit } from '@angular/core';
import { CourseDetailDto } from 'src/app/common/school-manager/course-detail-dto';

@Component({
  selector: 'app-parent-test',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})

export class ParentComponent implements OnInit {
  dates: Date[] = [];
  startEnd: Map<string,Date>[] = [];

  constructor() { }

  ngOnInit(): void {
    this.buildDateList();
  }

  buildDateList(){
    let base: Date = new Date();
    let temp: Map<string,Date> = new Map<string,Date>();
    for(let i = 0; i <= 20; i++){
      let working: Date = new Date();
      working.setDate(base.getDate() + i);
      // console.log(working.getDay());
      if(working.getDay() == 6) {
        temp.set('start',working);
      } else if (working.getDay() == 0){
        temp.set('stop',working);
        this.startEnd.push(temp);
        temp = new Map<string,Date>();
      } else {
        this.dates.push(working);
      }
    }
    this.dates.forEach((d)=>{
      console.log(d);
    })
    this.startEnd.forEach((se)=>{
      console.log('START: ',se.get('start'));
      console.log('STOP: ',se.get('stop'));
    })
  }

}
