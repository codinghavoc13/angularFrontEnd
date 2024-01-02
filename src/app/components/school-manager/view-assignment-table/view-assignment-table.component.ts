import { Component, Input } from '@angular/core';
import { Assignment } from 'src/app/common/school-manager/assignment';

@Component({
  selector: 'app-view-assignment-table',
  templateUrl: './view-assignment-table.component.html',
  styleUrls: ['./view-assignment-table.component.css']
})
export class ViewAssignmentTableComponent {
  @Input() assignmentList: Assignment[] = [];
  @Input() groupTitle: string = '';

  sortFlag: string = 'asc';

  sortDueDateAsc() {
    this.assignmentList.sort((a, b) => new Date(a.assignmentDueDate).getTime() - new Date(b.assignmentDueDate).getTime());
    this.sortFlag = 'desc';
  }

  sortDueDateDesc() {
    this.assignmentList.sort((a, b) => new Date(b.assignmentDueDate).getTime() - new Date(a.assignmentDueDate).getTime());
    this.sortFlag = 'asc';
  }
}
