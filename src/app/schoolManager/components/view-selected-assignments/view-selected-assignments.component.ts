import { Component, Input } from '@angular/core';
import { Assignment } from 'src/app/common/school-manager/assignment';

@Component({
  selector: 'app-view-selected-assignments',
  templateUrl: './view-selected-assignments.component.html',
  styleUrls: ['./view-selected-assignments.component.css']
})
export class ViewSelectedAssignmentsComponent {
  @Input() selectedAssignments: Assignment[] = [];
}
