import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
// @ts-ignore
import firebase from 'firebase/app';
import {Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {AlertController, LoadingController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    userDetails: firebase.User;
    usersRef: AngularFireList<firebase.UserInfo>;
    users: Array<firebase.UserInfo>;

    constructor(private afAuth: AngularFireAuth,
                private db: AngularFireDatabase,
                private router: Router,
                private loadingController: LoadingController) {
        this.usersRef = db.list('users');
        this.usersRef.valueChanges().subscribe(data => {
            this.users = data;
        });
    }

    public signInWithGoogle(): Subject<firebase.User> {
        const login$: Subject<any> = new Subject<any>();
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((res: firebase.auth.UserCredential) => {
                if (res.user.emailVerified) {
                    const isUserExists = this.isUserExists(res.user.providerData[0].uid);
                    if (isUserExists) {
                        this.userDetails = res.user.providerData;
                        login$.next(res.user.providerData);
                    } else {
                        this.usersRef.push(res.user.providerData[0]).then((success) => {
                            this.userDetails = res.user.providerData;
                            login$.next(res.user.providerData);
                        }, (error) => {
                            login$.error(error);
                        });
                    }
                }
            });
        return login$;
    }

    async presentLoading() {
        const loading = await this.loadingController.create({
            message: 'Please wait, Logout in Progress...'
        });
        return await loading.present();
    }

    public signOut() {
        this.presentLoading();
        this.afAuth.auth.signOut().then(value => {
            this.router.navigate(['login']);
            this.loadingController.dismiss();
        }, reason => {
            this.router.navigate(['login']);
            this.loadingController.dismiss();
        });
        setTimeout(() => {
            this.router.navigate(['login']);
            this.loadingController.dismiss();
        }, 2000);
    }

    private isUserExists(uid) {
        return (this.users.filter(user => (user.uid === uid)).length > 0);
    }
}
