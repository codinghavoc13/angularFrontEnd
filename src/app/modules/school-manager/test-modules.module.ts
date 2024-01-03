import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildComponent } from 'src/app/components/school-manager/test/child/child.component';
import { ParentComponent } from 'src/app/components/school-manager/test/parent/parent.component';
import { NavComponent } from 'src/app/components/school-manager/test/nav/nav.component';

@NgModule({
  declarations: [
    ChildComponent,
    ParentComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    ChildComponent,
    ParentComponent,
    NavComponent
  ]
})
export class TestModulesModule { }
