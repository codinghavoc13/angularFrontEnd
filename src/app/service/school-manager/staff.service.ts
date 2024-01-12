import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseDetailDto } from 'src/app/common/school-manager/course-detail-dto';
import { AssignStudentDto } from 'src/app/common/school-manager/assign-student-dto';
import { UserDto } from 'src/app/common/school-manager/user-dto';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  staffUrl = "http://localhost:8080/staff";

  constructor(private httpClient: HttpClient, private router: Router, private toastr: ToastrService) { }

  getStudentsNotAssignedToTeacher(){
    return this.httpClient.get<UserDto[]>(this.staffUrl+"/getStudentsNotAssignedToTeacher");
  }

  getUnverifiedUsers(){
    return this.httpClient.get<UserDto[]>(this.staffUrl+"/getUnverifiedUsers");
  }

  verifyUser(userId: number){
    this.httpClient.put<UserDto>(this.staffUrl+"/verifyUser/"+userId, null).subscribe(
      // data => console.log('u-svc-1: ' + data)
    );
  }

  getCourseDetails(){
    return this.httpClient.get<CourseDetailDto[]>(this.staffUrl+"/getCourseDetails");
  }

  submitStudentAssignmentDto(asDto: AssignStudentDto){
    return this.httpClient.post<AssignStudentDto>(this.staffUrl+"/assignStudentsToCourse", asDto);
  }
}
