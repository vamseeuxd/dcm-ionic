import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PatientService} from '../patient.service';
import {PatientDetails} from '../PatientDetails';

@Component({
    selector: 'app-patient-list',
    templateUrl: './patient-list.component.html',
    styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

    public patients: Array<PatientDetails>;
    @Output() select: EventEmitter<PatientDetails> = new EventEmitter<PatientDetails>();

    constructor(private patientService: PatientService) {
        this.initializeItems();
    }

    ngOnInit() {
    }

    initializeItems() {
        this.patients = this.patientService.patients;
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

}
