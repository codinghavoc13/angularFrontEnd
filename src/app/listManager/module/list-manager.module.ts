import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';
import { ListManagerMainComponent } from '../components/list-manager-main/list-manager-main.component';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';
import { ListPageComponent } from '../components/list-page/list-page.component';
import { CreateEditListComponent } from '../components/create-edit-list/create-edit-list.component';
import { ListDetailComponent } from '../components/list-detail/list-detail.component';

const routes: Routes = [
    {path: 'listManager', component:ListManagerMainComponent}
];

@NgModule({
  declarations: [
    ListManagerMainComponent,
    NavBarComponent,
    ListPageComponent,
    CreateEditListComponent,
    ListDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
  ]
})
export class ListManagerModule { }