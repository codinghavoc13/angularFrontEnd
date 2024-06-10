import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { ListManagerMainComponent } from '../components/list-manager-main/list-manager-main.component';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';
import { ListPageComponent } from '../components/list-page/list-page.component';
import { CreateEditListComponent } from '../components/create-edit-list/create-edit-list.component';
import { ListDetailComponent } from '../components/list-detail/list-detail.component';
import { LoginPageComponent } from '../components/login-page/login-page.component';
import { LogoutButtonComponent } from '../components/logout-button/logout-button.component';

const routes: Routes = [
    {path: 'listManager', component:ListManagerMainComponent},
    {path: 'listManager/login', component:LoginPageComponent},
    {path: 'listManager/listPage', component:ListPageComponent},
    // {path: '', component: ListManagerMainComponent},
    // {path: '**', component:ListManagerMainComponent}
];

@NgModule({
  declarations: [
    ListManagerMainComponent,
    NavBarComponent,
    ListPageComponent,
    CreateEditListComponent,
    ListDetailComponent,
    LoginPageComponent,
    LogoutButtonComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ToastrModule.forRoot({positionClass:'toast-bottom-right'})
  ],
  exports: [
  ]
})
export class ListManagerModule { }