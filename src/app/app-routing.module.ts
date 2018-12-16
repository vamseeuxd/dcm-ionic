import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuardService} from './services/auth-guard.service';

const routes: Routes = [
    {path: '', canActivate: [AuthGuardService], loadChildren: './pages/order-system/tabs/tabs.module#TabsPageModule'},
    {path: 'profile', canActivate: [AuthGuardService], loadChildren: './pages/public/profile/profile.module#ProfilePageModule'},
    {path: 'login', loadChildren: './pages/public/login/login.module#LoginPageModule'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
