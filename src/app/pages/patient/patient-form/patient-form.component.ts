import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PatientDetails} from '../PatientDetails';

@Component({
    selector: 'app-patient-form',
    templateUrl: './patient-form.component.html',
    styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit {

    @Output() save: EventEmitter<PatientDetails> = new EventEmitter<PatientDetails>();
    @Output() cancel: EventEmitter<PatientDetails> = new EventEmitter<PatientDetails>();
    private patientToEdit: PatientDetails = new PatientDetails();

    private _patientDetails: PatientDetails;

    @Input('patientDetails')
    set patientDetails(_patientDetails: PatientDetails) {
        this._patientDetails = JSON.parse(JSON.stringify(_patientDetails));
        this.patientToEdit = JSON.parse(JSON.stringify(_patientDetails));
    }

    constructor() {
    }

    ngOnInit() {
    }

    savePatientInfo() {
        this.save.emit(this.patientToEdit);
    }

    cancelPatientInfo() {
        this.cancel.emit(this._patientDetails);
    }
}
