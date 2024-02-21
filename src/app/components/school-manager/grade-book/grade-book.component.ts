import { Component, OnInit } from '@angular/core';
import { GradeBookDTO } from 'src/app/common/school-manager/grade-book-dto';
import { TeacherService } from 'src/app/service/school-manager/teacher.service';
import { UserService } from 'src/app/service/school-manager/user.service';

@Component({
  selector: 'app-grade-book',
  templateUrl: './grade-book.component.html',
  styleUrls: ['./grade-book.component.css']
})
export class GradeBookComponent implements OnInit{
  gradeBook: GradeBookDTO = new GradeBookDTO([],[],[],[],[]);
  role: String = '';
  teacherId: number = 0;

  constructor(private smUserSvc: UserService, private teacherSvc: TeacherService){}

  ngOnInit(): void {
    this.role = this.smUserSvc.getLoggedInUserRole()
    this.teacherId = this.smUserSvc.getLoggedInUserId();
    this.getGradeBook();
    // console.log(this.gradeBook);
  }

  async getGradeBook(){
    await this.teacherSvc.getGradeBook(this.teacherId).subscribe(
      response => {
        this.gradeBook = response;
        console.log('gb-ggb-1',this.gradeBook);
        console.log('gb-ggb-3',this.gradeBook.weeks);
        const map = new Map(Object.entries(this.gradeBook.weeks));
        console.log('gb-ggb-4',map.get('0'));
        // console.log(this.gradeBook.weeks.forEach((week)=>{
        //   console.log('gb-ggb-2',week);
        // }))
      }
    );
  }

  displayWeek(week: Map<string,Date>){
    console.log('bg-dw-1',week);
    // week.forEach((a) =>{
    //   console.log(a);
    // });
    
    // console.log(newWeek(week));
    // return week.get('start')?.toDateString();
  }
}
