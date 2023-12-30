import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssignmentDto } from 'src/app/common/school-manager/assignment-dto';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  baseUrl = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  submitAssignments(assignmentDto: AssignmentDto){
    const urlString = this.baseUrl+"/teacher/saveNewAssignment";
    console.log('sm-sa-2');
    console.log(urlString);
    console.log('sm-sa-3');
    console.log(assignmentDto);
    // return this.httpClient.post<AssignmentDto>(this.baseUrl+"/teacher/saveNewAssignment",assignmentDto).pipe(
    //   map((response:AssignmentDto)=>{
    //     console.log(response);
    //     const assignments = response;
    //     console.log('sm-sa-1');
    //     console.log(assignments);
    //   })
    // )
    return this.httpClient.post<AssignmentDto>(this.baseUrl+"/teacher/saveNewAssignment", assignmentDto).subscribe(
      data=>{
        console.log('sm-sa-1')
        console.log(data.assignments);
      }
    )
  }
}
