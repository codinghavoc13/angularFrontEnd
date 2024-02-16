import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseDetailDto } from 'src/app/common/school-manager/course-detail-dto';
import { AssignStudentDto } from 'src/app/common/school-manager/assign-student-dto';
import { UserDto } from 'src/app/common/school-manager/user-dto';
import { StudentListDto } from 'src/app/common/school-manager/student-list-dto';
import { StudentDetailDto } from 'src/app/common/school-manager/student-detail-dto';
import { FullCourseDetailDto } from 'src/app/common/school-manager/full-course-detail-dto';
import { GradeEntryDTO } from 'src/app/common/school-manager/grade-entry-dto';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  studentList:StudentDetailDto[] = [];

  staffUrl = "http://localhost:8080/staff";
  teacherUrl = "http://localhost:8080/teacher";

  constructor(private httpClient: HttpClient, private router: Router, private toastr: ToastrService) { }

  getAllMiddleHighStudents(){
    return this.httpClient.get<StudentDetailDto[]>(this.staffUrl+"/getAllMiddleHighStudents");
  }

  getStudentsNotAssignedToTeacher(){
    return this.httpClient.get<StudentDetailDto[]>(this.staffUrl+"/getStudentsNotAssignedToTeacher");
  }

  getUnverifiedUsers(){
    return this.httpClient.get<UserDto[]>(this.staffUrl+"/getUnverifiedUsers");
  }

  verifyUser(userId: number){
    this.httpClient.put<UserDto>(this.staffUrl+"/verifyUser/"+userId, null).subscribe(
      // data => console.log('u-svc-1: ' + data)
    );
  }

  getCourseDetails(term: string){
    return this.httpClient.get<CourseDetailDto[]>(this.staffUrl+"/getCourseDetails/"+term);
  }

  getCoursesByStudentId(studentId: number){
    return this.httpClient.get<CourseDetailDto[]>(this.staffUrl+"/getCoursesByStudent/"+studentId);
  }

  getFullCourseDetails(){
    return this.httpClient.get<FullCourseDetailDto[]>(this.staffUrl+"/getFullCourseDetails");
  }

  submitInitialGradeEntries(gradeEntryList: GradeEntryDTO[]){
    console.log('ss-sige-1', gradeEntryList);
    return this.httpClient.post<GradeEntryDTO[]>(this.teacherUrl+"/saveGrade",gradeEntryList);
  }

  //consider renaming this, might be mistaken for submitting assignments
  submitStudentAssignmentDto(asDto: AssignStudentDto){
    return this.httpClient.post<AssignStudentDto>(this.staffUrl+"/assignStudentsToCourse", asDto);
  }

  getStudentsByTeacherId(teacherId: number){
    return this.httpClient.get<StudentListDto[]>(this.teacherUrl+"/getStudents/"+teacherId);
  }
}
