import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PatientDetails} from '../../patient/PatientDetails';

@Component({
    selector: 'app-home',
    templateUrl: 'patient-details.page.html',
    styleUrls: ['patient-details.page.scss']
})
export class PatientDetailsPage {
    items;
    patientDetails: PatientDetails;

    readonly pageState = {
        list: '0',
        edit: '1',
        details: '2',
    };
    currentPageState = this.pageState.list;

    constructor() {
    }

    changePatient() {
        this.currentPageState = this.pageState.list;
    }

    deletePatient() {
        this.currentPageState = this.pageState.list;
    }

    showPatientInfo(item: PatientDetails) {
        this.patientDetails = item;
        this.currentPageState = this.pageState.details;
    }

    editPatient(patientDetails) {
        this.patientDetails = patientDetails;
        this.currentPageState = this.pageState.edit;
    }
}
