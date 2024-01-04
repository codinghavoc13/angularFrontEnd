import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildComponent } from 'src/app/components/school-manager/test/child/child.component';
import { ParentComponent } from 'src/app/components/school-manager/test/parent/parent.component';
import { NavComponent } from 'src/app/components/school-manager/test/nav/nav.component';
import { RouterModule, Routes } from '@angular/router';
import { DynamicAddTestComponent } from 'src/app/dynamic-add-test/dynamic-add-test.component';
import { SharedModule } from './shared.module';

const routes: Routes = [
  {path: 'test/parent', component:ParentComponent},
  {path: 'test/dat',component:DynamicAddTestComponent}
]

@NgModule({
  declarations: [
    ChildComponent,
    ParentComponent,
    NavComponent,
    DynamicAddTestComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
    ChildComponent,
    ParentComponent,
    NavComponent,
    DynamicAddTestComponent
  ]
})
export class TestModulesModule { }
