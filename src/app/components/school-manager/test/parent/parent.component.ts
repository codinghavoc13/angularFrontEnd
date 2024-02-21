import { Component, OnInit } from '@angular/core';
import { CourseDetailDto } from 'src/app/common/school-manager/course-detail-dto';
import { GradeBookDTO } from 'src/app/common/school-manager/grade-book-dto';
import { TeacherService } from 'src/app/service/school-manager/teacher.service';

@Component({
  selector: 'app-parent-test',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})

export class ParentComponent implements OnInit {
  dates: Date[] = [];
  startEnd: Map<string,Date>[] = [];
  gradeBook: GradeBookDTO = new GradeBookDTO([],[],[],[],[]);
  role: String = '';
  teacherId: number = 38;

  constructor(private teacherSvc: TeacherService) { }

  ngOnInit(): void {
    // this.buildDateList();
    this.getGradeBook();
    // let date = new Date('2024-02-21');
    // console.log(date.toLocaleDateString("en-US"));
  }

  async getGradeBook(){
    await this.teacherSvc.getGradeBook(this.teacherId).subscribe(
      response => {
        this.gradeBook = response;
        console.log('gb-ggb-1',this.gradeBook);
        // console.log('gb-ggb-3',this.gradeBook.weeks);
        // let weeks = this.gradeBook.weeks;
        // console.log(weeks);
        // let weeks2 = weeks[0] as unknown as WeekMap;
        // console.log(weeks2);
        // console.log(this.gradeBook.weeks.forEach((week)=>{
        //   console.log('gb-ggb-2',week);
        // }))
      }
    );
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
      console.log(se);
      // console.log('START: ',se.get('start')?.toDateString());
      // console.log('STOP: ',se.get('stop'));
    })
  }

}

interface WeekMap {
  key: string,
  value: Date
}
