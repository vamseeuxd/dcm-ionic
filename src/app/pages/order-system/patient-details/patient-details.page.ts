import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PatientDetails} from '../../patient/PatientDetails';
import {PatientService} from '../../patient/patient.service';
import {LoadingController} from '@ionic/angular';

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
        add: '3',
    };
    currentPageState = this.pageState.list;

    constructor(private patientService: PatientService, public loadingController: LoadingController) {
    }

    async presentLoading() {
        const loading = await this.loadingController.create({
            message: 'Please wait...'
        });
        return await loading.present();
    }

    changePatient() {
        this.currentPageState = this.pageState.list;
    }

    deletePatient(patientDetails: PatientDetails) {
        this.presentLoading();
        this.patientService.deletePatient(patientDetails.key).then(value => {
            console.log(value);
            this.patientDetails = new PatientDetails();
            this.currentPageState = this.pageState.list;
            this.loadingController.dismiss();
        }, reason => {
            console.log(reason);
            this.patientDetails = new PatientDetails();
            this.currentPageState = this.pageState.list;
            this.loadingController.dismiss();
        });
    }

    showPatientInfo(patientDetails: PatientDetails) {
        this.patientDetails = patientDetails;
        this.currentPageState = this.pageState.details;
    }

    editPatient(patientDetails) {
        this.patientDetails = patientDetails;
        this.currentPageState = this.pageState.edit;
    }

    cancelPatientInfo(patientDetails: PatientDetails) {
        if (this.currentPageState === this.pageState.add) {
            this.patientDetails = patientDetails;
            this.currentPageState = this.pageState.list;
            this.loadingController.dismiss();
        } else if (this.currentPageState === this.pageState.edit) {
            this.patientDetails = patientDetails;
            this.currentPageState = this.pageState.details;
            this.loadingController.dismiss();
        }
    }

    addPatient() {
        this.patientDetails = new PatientDetails();
        this.currentPageState = this.pageState.add;
    }

    savePatientInfo(patientDetails: PatientDetails) {
        this.presentLoading();
        if (this.currentPageState === this.pageState.add) {
            this.patientService.addPatient(patientDetails).then(value => {
                this.patientDetails = new PatientDetails();
                this.currentPageState = this.pageState.list;
                this.loadingController.dismiss();
            }, reason => {
                this.patientDetails = new PatientDetails();
                this.currentPageState = this.pageState.list;
                this.loadingController.dismiss();
            });
        } else if (this.currentPageState === this.pageState.edit) {
            this.patientService.updatePatient(patientDetails).then(value => {
                console.log(value);
                this.patientDetails = new PatientDetails();
                this.currentPageState = this.pageState.list;
                this.loadingController.dismiss();
            }, reason => {
                this.patientDetails = new PatientDetails();
                this.currentPageState = this.pageState.list;
                this.loadingController.dismiss();
            });
        }
    }
}
