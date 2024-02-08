import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { CourseDetailDto } from 'src/app/common/school-manager/course-detail-dto';
import { FullCourseDetailDto } from 'src/app/common/school-manager/full-course-detail-dto';
import { StudentDetailDto } from 'src/app/common/school-manager/student-detail-dto';
import { StudentListDto } from 'src/app/common/school-manager/student-list-dto';
import { StaffService } from 'src/app/service/school-manager/staff.service';

@Component({
  selector: 'app-view-students-by-course',
  templateUrl: './view-students-by-course.component.html',
  styleUrls: ['./view-students-by-course.component.css']
})
export class ViewStudentsByCourseComponent implements OnInit {
  fullCourseDetailList: FullCourseDetailDto[] = [];

  constructor(private staffSvc: StaffService) { }

  ngOnInit(): void {
    this.buildList();
  }

  buildList() {
    this.staffSvc.getFullCourseDetails().subscribe(
      response => {
        this.fullCourseDetailList = response;
      }
    )
  }

  teacherInfoString(dto: FullCourseDetailDto) {
    let result = "";
    result = dto.course.teacherFirstName + " " + dto.course.teacherLastName;
    result += " - " + dto.course.courseName + " - ";
    if (dto.course.credit >= 0) {
      if(dto.course.period != 0){
      result += dto.course.period + " - ";
      }
      if (dto.course.credit == 0.5) {
        if (dto.course.courseBlock == "FALL_SEMESTER") {
          result += "Fall Semester - ";
        }
        if (dto.course.courseBlock == "SPRING_SEMESTER") {
          result += "Spring Semester - ";
        }
      }
    }
    result += dto.students.length + " enrolled"
    return result;
  }

}
