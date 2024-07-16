import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Assignment } from '../../../common/assignment';
import { AssignmentService } from '../../../service/assignment.service';
import { UserService } from '../../../service/user.service';
import { SchoolManagerModule } from '../../../module/school-manager/school-manager.module';
import { MainModule } from '../../../../main/module/main/main.module';

@Component({
  selector: 'app-view-assignment-table-group',
  standalone: true,
  imports: [
    MainModule,
    SchoolManagerModule
  ],
  templateUrl: './view-assignment-table-group.component.html',
  styleUrl: './view-assignment-table-group.component.css'
})
export class ViewAssignmentTableGroupComponent implements OnInit {
  @Input() assignmentList: Assignment[] = [];
  @Output() selectedListEmit = new EventEmitter<Assignment[]>();

  homeworkList: Assignment[] = [];
  quizList: Assignment[] = [];
  reportList: Assignment[] = [];
  selectedAssignments: Assignment[] = [];
  teacherId: number = 0;
  testList: Assignment[] = [];

  //homework, quiz, report, test, selected
  sortFlag: string[] = ['asc','asc','asc','asc','asc'];

  constructor(private assignSvc: AssignmentService,
    public smUserSvc: UserService) { }

  ngOnInit(): void {
    this.teacherId = this.smUserSvc.getLoggedInUserId();
    this.assignSvc.getAssignmentsByTeacherId(this.teacherId).subscribe(
      response => {
        response.forEach((a) => {
          this.assignmentList.push(a);
        })
        this.assignmentList.forEach((a) => this.sortAssignment(a));
      }
    )
  }

  addAssignment(a: Assignment) {
    this.selectedAssignments.push(a);
  }

  removeAssignment(assignment: Assignment) {
    let temp: Assignment[] = [];
    this.selectedAssignments.forEach((a) => {
      if (a != assignment) {
        temp.push(a);
      }
    })
    this.selectedAssignments = temp;
    this.sortAssignment(assignment);
  }

  removeSelectedAssignment(incoming: Assignment) {
    console.log('vat-rsa-1');
    //need to rebuild one of three lists based on incoming.assignmentType
    if (incoming.assignmentType == 'HOMEWORK') {
      this.homeworkList.push(incoming);
      this.sortColumn('homework',this.sortFlag[0]);
    }
    if (incoming.assignmentType == 'QUIZ') {
      this.quizList.push(incoming);
      this.sortColumn('quiz',this.sortFlag[1]);
    }
    if (incoming.assignmentType == 'REPORT') {
      this.reportList.push(incoming);
      this.sortColumn('report',this.sortFlag[1]);
    }
    if (incoming.assignmentType == 'TEST') {
      this.testList.push(incoming);
      this.sortColumn('test',this.sortFlag[2]);
    }
    let temp:Assignment[] = [];
    this.selectedAssignments.forEach((a)=>{
      if(a!=incoming){
        temp.push(a);
      }
    });
    this.selectedAssignments = temp;
    this.sortColumn('select',this.sortFlag[3]);
  }

  selectAssignment(incoming: Assignment) {
    let temp: Assignment[] = [];
    this.selectedAssignments.push(incoming);
    this.sortColumn('select',this.sortFlag[3]);
    //need to rebuild one of three lists based on incoming.assignmentType
    if (incoming.assignmentType == 'HOMEWORK') {
      this.homeworkList.forEach((a) => {
        if (a != incoming) {
          temp.push(a);
        }
      })
      this.homeworkList = temp;
    }
    if (incoming.assignmentType == 'QUIZ') {
      this.quizList.forEach((a) => {
        if (a != incoming) {
          temp.push(a);
        }
      })
      this.quizList = temp;
    }
    if (incoming.assignmentType == 'TEST') {
      this.testList.forEach((a) => {
        if (a != incoming) {
          temp.push(a);
        }
      })
      this.testList = temp;
    }
  }

  sendSelectedCourses(){
    this.selectedListEmit.emit(this.selectedAssignments);
  }

  sortAssignment(a: Assignment) {
    if (a.assignmentType == 'HOMEWORK') {
      this.homeworkList.push(a);
    }
    if (a.assignmentType == 'QUIZ') {
      this.quizList.push(a);
    }
    if (a.assignmentType == 'TEST') {
      this.testList.forEach((b) => {
        if (a == b) { console.log('exists') }
      })
      this.testList.push(a);
    }
  }

  sortColumn(list: string, order: string) {
    switch (list) {
      case 'homework':
        if(order=='asc'){
          this.homeworkList.sort((a, b) => new Date(a.assignmentDueDate).getTime() - new Date(b.assignmentDueDate).getTime());
        }
        if(order=='desc'){
        this.homeworkList.sort((a, b) => new Date(b.assignmentDueDate).getTime() - new Date(a.assignmentDueDate).getTime());
        }
        this.sortFlag[0] = order;
        break;
      case 'quiz':
        if(order=='asc'){
          this.quizList.sort((a, b) => new Date(a.assignmentDueDate).getTime() - new Date(b.assignmentDueDate).getTime());
        }
        if(order=='desc'){
        this.quizList.sort((a, b) => new Date(b.assignmentDueDate).getTime() - new Date(a.assignmentDueDate).getTime());
        }
        this.sortFlag[1] = order;
        break;
      case 'report':
        if(order=='asc'){
          this.reportList.sort((a, b) => new Date(a.assignmentDueDate).getTime() - new Date(b.assignmentDueDate).getTime());
        }
        if(order=='desc'){
        this.reportList.sort((a, b) => new Date(b.assignmentDueDate).getTime() - new Date(a.assignmentDueDate).getTime());
        }
        this.sortFlag[2] = order;
        break;
      case 'test':
        if(order=='asc'){
          this.testList.sort((a, b) => new Date(a.assignmentDueDate).getTime() - new Date(b.assignmentDueDate).getTime());
        }
        if(order=='desc'){
        this.testList.sort((a, b) => new Date(b.assignmentDueDate).getTime() - new Date(a.assignmentDueDate).getTime());
        }
        this.sortFlag[3] = order;
        break;
      case 'select':
        if(order=='asc'){
          this.selectedAssignments.sort((a, b) => new Date(a.assignmentDueDate).getTime() - new Date(b.assignmentDueDate).getTime());
        }
        if(order=='desc'){
        this.selectedAssignments.sort((a, b) => new Date(b.assignmentDueDate).getTime() - new Date(a.assignmentDueDate).getTime());
        }
        this.sortFlag[4] = order;
        break;
    }
  }

}
