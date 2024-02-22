import { Component, Input, OnInit, TemplateRef, inject } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  gradesToUpdate: Map<number, number> = new Map();
  role: String = '';
  showUpdateGrade: boolean = true;
  teacherId: number = 0;
  workingGradeList: number[] = [];

  //bootstrap modal
  // private modalService = inject(NgbModal);
	closeResult = '';
  testGrade: number = 42;
  @Input() public gradeInput: number = 0;

  constructor(private modalSvc: NgbModal,
    private smUserSvc: UserService, private teacherSvc: TeacherService){}

  ngOnInit(): void {
    this.role = this.smUserSvc.getLoggedInUserRole()
    this.teacherId = this.smUserSvc.getLoggedInUserId();
    this.getGradeBook();
  }

  open() {
    const modelRef = this.modalSvc.open({ ariaLabelledBy: 'modal-basic-title' });

		// this.modalService.open({ ariaLabelledBy: 'modal-basic-title' }).result.then(
			
		// );
	}

  addToWorkingList(id:number){
    console.log('bg-atwl-1',this.workingGradeList);
    this.workingGradeList.push(id);
    console.log('bg-atwl-1',this.workingGradeList);
  }

  async getGradeBook(){
    await this.teacherSvc.getGradeBook(this.teacherId).subscribe(
      response => {
        this.gradeBook = response;
      }
    );
  }

  isGradeSelected(gradeId: number){
    // return this.gradesToUpdate.has(gradeId);
    return this.workingGradeList.includes(gradeId);
  }

  updateGradeUpdateList(id: number, grade: number){
    console.log('bg-ugul-1',this.workingGradeList);
    this.gradesToUpdate.set(id, grade);
    let temp: number[] = [];
    this.workingGradeList.forEach((i)=>{
      if(i!=id)temp.push(i);
    })
    this.workingGradeList = temp;
    console.log('bg-ugul-2',this.workingGradeList);
  }
}
