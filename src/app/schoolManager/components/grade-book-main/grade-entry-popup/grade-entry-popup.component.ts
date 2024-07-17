import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MainModule } from '../../../../main/module/main/main.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-grade-entry-popup',
  standalone: true,
  imports: [
    MainModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './grade-entry-popup.component.html',
  styleUrl: './grade-entry-popup.component.css'
})
export class GradeEntryPopupComponent {
  gradeEntry: number = 0;
  validEntryWarn: boolean = false;
  @Output() gradeEmitter = new EventEmitter<number>();

  constructor(private activeModal: NgbActiveModal,
    private toastr: ToastrService) { }

  submitGrade() {
    if (Number.isFinite(this.gradeEntry)) {
      if (this.gradeEntry < 0.0 || this.gradeEntry > 100.0) {
        this.validEntryWarn = true;
        this.toastr.error("Enter a valid number between 0.0 and 100.0");
      } else {
        this.activeModal.close(this.gradeEntry);
      }
    } else {
      this.validEntryWarn = true;
      this.toastr.error("Enter a valid number between 0.0 and 100.0");
    }
  }
}
