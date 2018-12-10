import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {path: 'login', loadChildren: './tabs/tabs.module#TabsPageModule'},
    {path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule'},
    {path: '', loadChildren: './login/login.module#LoginPageModule'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
