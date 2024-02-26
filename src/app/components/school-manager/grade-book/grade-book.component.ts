import { Component, Input, OnInit, TemplateRef, inject } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GradeBookDTO } from 'src/app/common/school-manager/grade-book-dto';
import { TeacherService } from 'src/app/service/school-manager/teacher.service';
import { UserService } from 'src/app/service/school-manager/user.service';
import { GradeEntryPopupComponent } from './grade-entry-popup/grade-entry-popup.component';
import { SingleGradeDTO } from 'src/app/common/school-manager/single-grade-DTO';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-grade-book',
  templateUrl: './grade-book.component.html',
  styleUrls: ['./grade-book.component.css']
})
export class GradeBookComponent implements OnInit{
  gradeBook: GradeBookDTO = new GradeBookDTO([],[],[],[],[]);
  //may rework gradesToUpdate to be a map of numbers and SingleGradeDTOs
  gradesToUpdate: Map<number, SingleGradeDTO> = new Map();
  // gradesToUpdate: Map<number, number> = new Map();
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

  // addToWorkingList(id:number){
  //   this.workingGradeList.push(id);
  // }

  displayGrade(gradeId:number, existingGrade: number){
    //when I switch gradesToUpdate to SGDs, this will
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

  // isGradeSelected(gradeId: number){
  //   return this.workingGradeList.includes(gradeId);
  // }

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

  // updateGradeUpdateList(id: number, grade: number){
  //   console.log('bg-ugul-1',this.workingGradeList);
  //   this.gradesToUpdate.set(id, grade);
  //   let temp: number[] = [];
  //   this.workingGradeList.forEach((i)=>{
  //     if(i!=id)temp.push(i);
  //   })
  //   this.workingGradeList = temp;
  //   console.log('bg-ugul-2',this.workingGradeList);
  // }
}
