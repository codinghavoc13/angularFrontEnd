import { Component, Input } from '@angular/core';
import { Assignment } from '../../common/assignment';
import { MainModule } from '../../../main/module/main/main.module';

@Component({
  selector: 'app-view-selected-assignments',
  standalone: true,
  imports: [
    MainModule
  ],
  templateUrl: './view-selected-assignments.component.html',
  styleUrl: './view-selected-assignments.component.css'
})
export class ViewSelectedAssignmentsComponent {
  @Input() selectedAssignments: Assignment[] = [];
}
