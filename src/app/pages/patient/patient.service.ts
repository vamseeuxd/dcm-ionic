import {Injectable} from '@angular/core';
import {PatientDetails} from './PatientDetails';

@Injectable({
    providedIn: 'root'
})
export class PatientService {

    public patients: Array<PatientDetails>;

    constructor() {
        this.generateFakePatients();
    }

    private generateFakePatients() {
        this.patients = [];
        for (let i = 0; i < 50; i++) {
            let patient: PatientDetails;
            patient = new PatientDetails();
            patient.name = 'Patient ' + i;
            patient.age = Math.floor(Math.random() * (100 - 20 + 1) + 20);
            patient.gender = (i % 2 === 0) ? 'Male' : 'Female';
            patient.mobile = Math.floor(100000000 + Math.random() * 900000000) + '';
            patient.email = 'patient ' + i + '@gmail.com';
            patient.address = 'Address Line 1...., Address Line 2...., Chennai 60042' + i;
            this.patients.push(patient);
        }
    }
}
