import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Assignment } from '../common/assignment';
import { AssignmentDto } from '../common/assignment-dto';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  baseUrl = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  submitAssignments(assignmentDto: AssignmentDto){
    const urlString = this.baseUrl+"/teacher/saveNewAssignment";
    return this.httpClient.post<AssignmentDto>(this.baseUrl+"/teacher/saveNewAssignment", assignmentDto).subscribe(
    )
  }

  getAssignmentsByTeacherId(teacher_id: number){
    return this.httpClient.get<Assignment[]>(this.baseUrl+"/teacher/getAssignments/teacher_id/"+teacher_id);
  }
}
