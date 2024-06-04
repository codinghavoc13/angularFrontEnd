import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { Assignment } from 'src/app/common/school-manager/assignment';
// import { AssignStudentComponent } from '../../../../schoolManager/components/assign-student-main/assign-student/assign-student.component';

@Component({
  selector: 'app-view-assignment-table',
  templateUrl: './view-assignment-table.component.html',
  styleUrls: ['./view-assignment-table.component.css']
})
export class ViewAssignmentTableComponent {
  // @Input() assignmentList: Assignment[] = [];
  // @Input() newAssignment: Assignment | undefined;
  // @Input() groupTitle: string = '';
  // @Output() selectedAssignmentEmit = new EventEmitter<Assignment>();
  // //going to need to use the Output to send the selected assignment
  // @Output() removeHWSelectEmit = new EventEmitter<Assignment>();
  // @Output() removeQuizSelectEmit = new EventEmitter<Assignment>();
  // @Output() removeTestSelectEmit = new EventEmitter<Assignment>();
  
  // // homeworkList: Assignment[] = [];
  // // quizList: Assignment[] = [];
  // selectedAssignments: Assignment[] = [];
  // // testList: Assignment[] = [];

  // sortFlag: string = 'asc';

  // removeSelectedAssignment(incoming: Assignment){
  //   console.log('vat-rsa-1');
  //   //when removing assignments from the selected list and putting back in the pool, I need to be sending them from the main page selected back to the individual page
  //   this.selectedAssignmentEmit.emit(incoming);
  // }

  // selectAssignment(incoming: Assignment) {
  //   let temp: Assignment[] = [];
  //   if (this.selectedAssignments.includes(incoming)) {
  //     // this.toastr.warning("That assignment has already been selected")
  //   } else {
  //     this.selectedAssignmentEmit.emit(incoming);
  //     this.selectedAssignments.push(incoming);
  //     this.assignmentList.forEach((a) => {
  //       if(a!=incoming){
  //         temp.push(a);
  //       }
  //     })
  //     console.log(this.selectedAssignments.length)
  //     this.assignmentList = temp;
  //   }
  // }

  // sortDueDateAsc() {
  //   this.assignmentList.sort((a, b) => new Date(a.assignmentDueDate).getTime() - new Date(b.assignmentDueDate).getTime());
  //   this.sortFlag = 'desc';
  // }

  // sortDueDateDesc() {
  //   this.assignmentList.sort((a, b) => new Date(b.assignmentDueDate).getTime() - new Date(a.assignmentDueDate).getTime());
  //   this.sortFlag = 'asc';
  // }

  // updateList(incoming: Assignment){
  //   this.assignmentList.push(incoming);
  // }
}
