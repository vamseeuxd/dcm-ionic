import {Injectable} from '@angular/core';
import {PatientDetails} from './PatientDetails';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PatientService {

    patientsRef: AngularFireList<PatientDetails>;
    public patients: Observable<PatientDetails[]>;

    constructor(db: AngularFireDatabase) {
        this.patientsRef = db.list('patients');
        this.getPatientDetails();
    }

    getPatientDetails() {
        this.patients = this.patientsRef.snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({key: c.payload.key.replace(/"/g, ''), ...c.payload.val()}))
            )
        );
        /*this.patients.subscribe(value => {
            console.log(value);
        });*/
    }

    addPatient(newPatient: PatientDetails) {
        delete newPatient.key;
        return this.patientsRef.push(newPatient);
    }

    updatePatient(newPatient: PatientDetails) {
        const patientKey = JSON.stringify(newPatient.key);
        delete newPatient.key;
        return this.patientsRef.update(patientKey, newPatient);
    }

    deletePatient(key: string) {
        return this.patientsRef.remove(key);
    }

    deleteEverything() {
        return this.patientsRef.remove();
    }
}
