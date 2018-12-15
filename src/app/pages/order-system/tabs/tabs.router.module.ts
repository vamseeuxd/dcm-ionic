import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TabsPage} from './tabs.page';
import {PatientDetailsPage} from '../patient-details/patient-details.page';
import {AboutPage} from '../about/about.page';
import {ContactPage} from '../contact/contact.page';

const routes: Routes = [
    {
        path: 'orders',
        component: TabsPage,
        children: [
            {
                path: '',
                redirectTo: '/orders/(patient-details:patient-details)',
                pathMatch: 'full',
            },
            {
                path: 'patient-details',
                outlet: 'patient-details',
                component: PatientDetailsPage
            },
            {
                path: 'about',
                outlet: 'about',
                component: AboutPage
            },
            {
                path: 'contact',
                outlet: 'contact',
                component: ContactPage
            }
        ]
    },
    {
        path: '',
        redirectTo: '/orders/(patient-details:patient-details)',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
