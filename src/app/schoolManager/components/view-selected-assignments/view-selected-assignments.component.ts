import { Component, Input } from '@angular/core';
import { Assignment } from '../../common/assignment';
import { SchoolManagerModule } from '../../module/school-manager/school-manager.module';
import { MainModule } from '../../../main/module/main/main.module';

@Component({
  selector: 'app-view-selected-assignments',
  standalone: true,
  imports: [
    MainModule,
    SchoolManagerModule
  ],
  templateUrl: './view-selected-assignments.component.html',
  styleUrl: './view-selected-assignments.component.css'
})
export class ViewSelectedAssignmentsComponent {
  @Input() selectedAssignments: Assignment[] = [];
}
