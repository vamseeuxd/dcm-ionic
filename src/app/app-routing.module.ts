import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {path: '', loadChildren: './pages/order-system/tabs/tabs.module#TabsPageModule'},
    {path: 'profile', loadChildren: './pages/public/profile/profile.module#ProfilePageModule'},
    {path: 'login', loadChildren: './pages/public/login/login.module#LoginPageModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
