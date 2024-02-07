import { incrementalFromCompilerTicket } from '@angular/compiler-cli/src/ngtsc/core';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Assignment } from 'src/app/common/school-manager/assignment';

@Component({
  selector: 'app-view-assignment-table',
  templateUrl: './view-assignment-table.component.html',
  styleUrls: ['./view-assignment-table.component.css']
})
export class ViewAssignmentTableComponent {
  @Input() assignmentList: Assignment[] = [];
  @Input() groupTitle: string = '';
  @Output() selectedAssignmentEmit = new EventEmitter<Assignment>();
  private selectedAssignments: Assignment[] = [];
  //going to need touse the Output to send the selected assignment

  sortFlag: string = 'asc';

  selectAssignment(incoming: Assignment) {
    let temp: Assignment[] = [];
    if (this.selectedAssignments.includes(incoming)) {
      // this.toastr.warning("That assignment has already been selected")
    } else {
      this.selectedAssignmentEmit.emit(incoming);
      this.selectedAssignments.push(incoming);
      this.assignmentList.forEach((a) => {
        if(a!=incoming){
          temp.push(a);
        }
      })
      console.log(this.selectedAssignments.length)
      this.assignmentList = temp;
    }
  }

  sortDueDateAsc() {
    this.assignmentList.sort((a, b) => new Date(a.assignmentDueDate).getTime() - new Date(b.assignmentDueDate).getTime());
    this.sortFlag = 'desc';
  }

  sortDueDateDesc() {
    this.assignmentList.sort((a, b) => new Date(b.assignmentDueDate).getTime() - new Date(a.assignmentDueDate).getTime());
    this.sortFlag = 'asc';
  }
}
