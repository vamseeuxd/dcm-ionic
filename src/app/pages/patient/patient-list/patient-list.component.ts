import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PatientService} from '../patient.service';
import {PatientDetails} from '../PatientDetails';
import * as _ from 'lodash';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-patient-list',
    templateUrl: './patient-list.component.html',
    styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

    public patients: Array<PatientDetails>;
    public masterPatients: Array<PatientDetails>;
    @Output() select: EventEmitter<PatientDetails> = new EventEmitter<PatientDetails>();
    @Output() delete: EventEmitter<PatientDetails> = new EventEmitter<PatientDetails>();
    @Output() edit: EventEmitter<PatientDetails> = new EventEmitter<PatientDetails>();

    constructor(
        private patientService: PatientService,
        public alertController: AlertController
    ) {
        // this.initializeItems();
        this.patientService.patients.subscribe(value => {
            this.masterPatients = value;
            this.initializeItems();
        });
    }

    ngOnInit() {
    }

    initializeItems() {
        this.patients = _.clone(this.masterPatients); // JSON.parse(JSON.stringify(this.masterPatients));
    }

    getItems(ev) {
        this.initializeItems();
        let val;
        val = ev.target.value;
        if (val && val.trim() !== '') {
            this.patients = this.patients.filter((item) => {
                return (item.mobile.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    }

    patientSelect(item: PatientDetails) {
        this.getItems({target: {value: ''}});
        this.select.emit(item);
    }

    async deleteConfirm(patientDetails: PatientDetails) {
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
                        this.delete.emit(patientDetails);
                    }
                }
            ]
        });

        await alert.present();
    }

    editPatient(patientDetails: PatientDetails) {
        this.edit.emit(patientDetails);
    }

}
