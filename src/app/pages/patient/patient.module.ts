import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {PatientListComponent} from './patient-list/patient-list.component';
import {PatientDetailsComponent} from './patient-details/patient-details.component';
import {PatientFormComponent} from './patient-form/patient-form.component';
import {IonicModule} from '@ionic/angular';
import {PatientService} from './patient.service';


@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule
    ],
    declarations: [
        PatientListComponent,
        PatientDetailsComponent,
        PatientFormComponent
    ],
    exports: [
        PatientListComponent,
        PatientDetailsComponent,
        PatientFormComponent
    ],
    entryComponents: [
        PatientListComponent,
        PatientDetailsComponent,
        PatientFormComponent
    ]
})
export class PatientModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: PatientModule,
            providers: [
                PatientService
            ]
        };
    }
}
