import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PatientDetails} from '../PatientDetails';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-patient-details',
    templateUrl: './patient-details.component.html',
    styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit {

    @Output() delete: EventEmitter<PatientDetails> = new EventEmitter<PatientDetails>();
    @Output() edit: EventEmitter<PatientDetails> = new EventEmitter<PatientDetails>();
    @Output() change: EventEmitter<PatientDetails> = new EventEmitter<PatientDetails>();

    @Input() patientDetails: PatientDetails;

    constructor(public alertController: AlertController) {
    }

    ngOnInit() {
    }

    async deleteConfirm() {
        const alert = await this.alertController.create({
            header: 'Delete Confirmation',
            message: 'Are you sure! do you want to delete?',
            buttons: [
                {
                    text: 'NO',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Yes',
                    handler: () => {
                        this.delete.emit(this.patientDetails);
                    }
                }
            ]
        });

        await alert.present();
    }

    deletePatient() {
        this.deleteConfirm();
    }

    editPatient() {
        this.edit.emit(this.patientDetails);
    }

    changePatient() {
        this.change.emit(this.patientDetails);
    }
}
