import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GradeBookDTO } from '../common/grade-book-dto';
import { GradeEntryDTO } from '../common/grade-entry-dto';
import { SingleGradeDTO } from '../common/single-grade-DTO';
import { StudentListDto } from '../common/student-list-dto';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  teacherUrl = "http://localhost:8080/teacher";

  constructor(private httpClient: HttpClient) { }

  getGradeBook(teacherId: number){
    return this.httpClient.get<GradeBookDTO>(this.teacherUrl+"/getGradeBook/"+teacherId);
  }

  getStudentsByTeacherId(teacherId: number){
    return this.httpClient.get<StudentListDto[]>(this.teacherUrl+"/getStudents/"+teacherId);
  }

  submitInitialGradeEntries(gradeEntryList: GradeEntryDTO[]){
    console.log('ss-sige-1', gradeEntryList);
    return this.httpClient.post<GradeEntryDTO[]>(this.teacherUrl+"/saveGrade",gradeEntryList);
  }

  updateGradeEntries(updateList: SingleGradeDTO[]){
    return this.httpClient.post<SingleGradeDTO[]>(this.teacherUrl+"/updateGradeEntries", updateList);
  }
}
