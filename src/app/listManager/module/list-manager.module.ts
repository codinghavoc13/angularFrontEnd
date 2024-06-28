import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { ListManagerMainComponent } from '../components/list-manager-main/list-manager-main.component';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';
import { ListPageComponent } from '../components/list-page/list-page.component';
import { ListDetailComponent } from '../components/list-detail/list-detail.component';
import { LoginPageComponent } from '../components/login-page/login-page.component';
import { LogoutButtonComponent } from '../components/logout-button/logout-button.component';
import { EditListComponent } from '../components/edit-list/edit-list.component';
// import { EditListItemsComponent } from '../components/edit-list-items/edit-list-items.component';
import { ConfirmDeletePopupComponent } from '../components/confirm-delete-popup/confirm-delete-popup.component';
import { EditItemPopupComponent } from '../components/edit-item-popup/edit-item-popup.component';

const routes: Routes = [
    {path: 'listManager', component:ListManagerMainComponent},
    {path: 'listManager/**', component:ListManagerMainComponent}
];

@NgModule({
  declarations: [
    ListManagerMainComponent,
    NavBarComponent,
    ListPageComponent,
    ListDetailComponent,
    LoginPageComponent,
    LogoutButtonComponent,
    EditListComponent,
    // EditListItemsComponent,
    ConfirmDeletePopupComponent,
    EditItemPopupComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ToastrModule.forRoot({positionClass:'toast-bottom-right'}),
    NgbModalModule
  ],
  exports: [
  ]
})
export class ListManagerModule { }