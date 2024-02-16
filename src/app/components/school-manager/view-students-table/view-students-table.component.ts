import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StudentDetailDto } from 'src/app/common/school-manager/student-detail-dto';
import { UserDto } from 'src/app/common/school-manager/user-dto';

@Component({
  selector: 'app-view-students-table',
  templateUrl: './view-students-table.component.html',
  styleUrls: ['./view-students-table.component.css']
})
export class ViewStudentsTableComponent {
  @Input() studentList: StudentDetailDto[] = [];
  @Input() showEnrollBtn: boolean = false;
  @Input() showEnrollAllBtn: boolean = false;
  @Input() showRemoveBtn: boolean = false;
  @Input() showRemoveAllBtn: boolean = false;
  @Input() showSelectBtn: boolean = false;
  @Input() showSelectAllBtn: boolean = false;
  @Input() showUnselectBtn: boolean = false;
  @Input() showUnselectAllBtn: boolean = false;
  @Output() selectAllStudentsEmit = new EventEmitter();
  @Output() selectStudentEmit = new EventEmitter<StudentDetailDto>();
  @Output() removeAllStudentsEmit = new EventEmitter();
  @Output() removeStudentEmit = new EventEmitter<StudentDetailDto>();
  sortFlags: SortFlags = ['asc','asc'];

  removeAll(){
    console.log('vst-ra-1');
    this.removeAllStudentsEmit.emit();
  }

  removeFromWorkingList(dto: StudentDetailDto){
    this.removeStudentEmit.emit(dto);
  }

  selectAll(){
    console.log('vst-sa-1')
    this.selectAllStudentsEmit.emit();
  }

  selectStudent(student: StudentDetailDto){
    this.selectStudentEmit.emit(student);
  }

  selectStudentForAssignment(student: StudentDetailDto){

  }

  sortField(flag: string) {
    switch (flag) {
      case 'asc-firstName':
        this.studentList.sort((a, b) => a.student.firstName.localeCompare(b.student.firstName));
        this.sortFlags[0]='desc';
        break;
      case 'desc-firstName':
        this.studentList.sort((a, b) => b.student.firstName.localeCompare(a.student.firstName));
        this.sortFlags[0]='asc';
        break;
      case 'asc-lastName':
        this.studentList.sort((a, b) => a.student.lastName.localeCompare(b.student.lastName));
        this.sortFlags[1]='desc';
        break;
      case 'desc-lastName':
        this.studentList.sort((a, b) => b.student.lastName.localeCompare(a.student.lastName));
        this.sortFlags[1]='asc';
        break;
      // case 'asc-creditCount':
      //   this.studentList.sort((a, b) => a.creditCount - b.creditCount);
      //   this.sortFlags[2]='desc';
      //   break;
      // case 'desc-creditCount':
      //   this.studentList.sort((a, b) => b.creditCount - a.creditCount);
      //   this.sortFlags[2]='asc';
      //   break;
    }
  }

}

type SortFlags = [firstNameSort: string,
  lastNameSort: string];

  // type SortFlags = [firstNameSort: string,
  //   lastNameSort: string,
  //   creditCountSort: string];