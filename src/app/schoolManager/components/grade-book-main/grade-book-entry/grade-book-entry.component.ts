import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { GradeBookDTO } from '../../../common/grade-book-dto';
import { SingleGradeDTO } from '../../../common/single-grade-DTO';
import { TeacherService } from '../../../service/teacher.service';
import { UserService } from '../../../service/user.service';
import { GradeEntryPopupComponent } from '../grade-entry-popup/grade-entry-popup.component';
import { MainModule } from '../../../../main/module/main/main.module';

@Component({
  selector: 'app-grade-book-entry',
  standalone: true,
  imports: [
    MainModule
  ],
  templateUrl: './grade-book-entry.component.html',
  styleUrl: './grade-book-entry.component.css'
})
export class GradeBookEntryComponent implements OnInit{
  gradeBook: GradeBookDTO = new GradeBookDTO([],[],[],[],[]);
  gradesToUpdate: Map<number, SingleGradeDTO> = new Map();
  role: String = '';
  teacherId: number = 0;
  workingGradeList: number[] = [];

  @Input() public gradeInput: number = 0;

  constructor(private modalSvc: NgbModal,
    private smUserSvc: UserService, private teacherSvc: TeacherService,
    private toastr: ToastrService){}

  ngOnInit(): void {
    this.role = this.smUserSvc.getLoggedInUserRole()
    this.teacherId = this.smUserSvc.getLoggedInUserId();
    this.getGradeBook();
  }

  displayGrade(gradeId:number, existingGrade: number){
    if(this.gradesToUpdate.has(gradeId)){
      return "*" + this.gradesToUpdate.get(gradeId)!.grade + "*";
    } else {
      return existingGrade;
    }
  }

  async getGradeBook(){
    await this.teacherSvc.getGradeBook(this.teacherId).subscribe(
      response => {
        this.gradeBook = response;
      }
    );
  }

  openGradeEntryForm(gradeId:number, existingGrade: number) {
    const modelRef = this.modalSvc.open(GradeEntryPopupComponent);
    modelRef.result.then((result)=>{
      if(result){
        console.log(result);
        let dto: SingleGradeDTO = new SingleGradeDTO(gradeId, result);
        this.gradesToUpdate.set(gradeId,dto);
        console.log(this.gradesToUpdate);
      }
    })
	}

  submitChanges(){
    let updateList: SingleGradeDTO [] = [];
    this.gradesToUpdate.forEach((g)=>{
      console.log(g);
      updateList.push(g);
    })
    console.log(updateList);
    this.teacherSvc.updateGradeEntries(updateList).subscribe(
      response=>{
        this.toastr.success(response.length + " records have been updated");
        //Will need to refresh the page after submitting changes
      }
    )
  }
}
