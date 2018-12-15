import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PatientDetails} from '../PatientDetails';

@Component({
    selector: 'app-patient-form',
    templateUrl: './patient-form.component.html',
    styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit {

    @Output() save: EventEmitter<string> = new EventEmitter<string>();
    @Output() cancel: EventEmitter<string> = new EventEmitter<string>();

    @Input() patientDetails: PatientDetails;

    constructor() {
    }

    ngOnInit() {
    }

    savePatientInfo(s: string) {
        this.save.emit('');
    }

    cancelPatientInfo(s: string) {
        this.cancel.emit('');
    }
}
