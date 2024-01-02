import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Assignment } from 'src/app/common/school-manager/assignment';
import { AssignmentDto } from 'src/app/common/school-manager/assignment-dto';
import { AssignmentService } from 'src/app/service/school-manager/assignment.service';
import { SchoolManagerService } from 'src/app/service/school-manager/school-manager.service';
import { UserService } from 'src/app/service/school-manager/user.service';
import { couldStartTrivia } from 'typescript';

@Component({
  selector: 'app-view-assignments',
  templateUrl: './view-assignments.component.html',
  styleUrls: ['./view-assignments.component.css']
})
export class ViewAssignmentsComponent implements OnInit{
  homeworkList: Assignment[] = [];
  quizList: Assignment[] = [];
  testList: Assignment[] = [];

  //look at passing teacherId from the userPage instead of injecting the UserService 
  public constructor(public smUserSvc: UserService, private assignSvc: AssignmentService){}

  ngOnInit(): void {
    this.assignSvc.getAssignmentsByTeacherId(this.smUserSvc.loggedInUser!.userId).subscribe(
      response =>{
        response.forEach((a)=>{
          if(a.assignmentType=='HOMEWORK') this.homeworkList.push(a);
          if(a.assignmentType=='QUIZ') this.quizList.push(a);
          if(a.assignmentType=='TEST') this.testList.push(a);
        })
      }
    )
  }
}