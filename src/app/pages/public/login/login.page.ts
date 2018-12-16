import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
// @ts-ignore
import firebase from 'firebase/app';
import {Router} from '@angular/router';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {AlertController, LoadingController} from '@ionic/angular';
import {AlertButton} from '@ionic/core';
import {LoginService} from './login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    userDetails: firebase.User;
    usersRef: AngularFireList<firebase.UserInfo>;
    users: Array<firebase.UserInfo>;

    constructor(private afAuth: AngularFireAuth,
                private db: AngularFireDatabase,
                private loginService: LoginService,
                public alertController: AlertController,
                public loadingController: LoadingController,
                private router: Router) {
        this.usersRef = db.list('users');
        this.usersRef.valueChanges().subscribe(data => {
            this.users = data;
        });
    }

    ngOnInit() {
    }

    async presentLoading() {
        const loading = await this.loadingController.create({
            message: 'Please wait, Login in Progress...'
        });
        return await loading.present();
    }

    signInWithGoogle() {
        this.presentLoading();
        this.loginService.signInWithGoogle().subscribe(value => {
            this.loadingController.dismiss();
            this.router.navigate(['orders']);
        }, error => {
            this.loadingController.dismiss();
        });
        /*this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((res: firebase.auth.UserCredential) => {
                if (res.user.emailVerified) {
                    const isUserExists = this.isUserExists(res.user.providerData[0].uid);
                    if (isUserExists) {
                        this.loadingController.dismiss();
                        this.userDetails = res.user.providerData;
                        this.router.navigate(['orders']);
                    } else {
                        this.usersRef.push(res.user.providerData[0]).then((success) => {
                            this.loadingController.dismiss();
                            this.userDetails = res.user.providerData;
                            this.router.navigate(['orders']);
                        }, (error) => {
                            this.loadingController.dismiss();
                        });
                    }
                }
            });*/
    }

    isUserExists(uid) {
        return (this.users.filter(user => (user.uid === uid)).length > 0);
    }

    signOut() {
        this.afAuth.auth.signOut();
    }

    async showErrorAlert(message, header = 'Alert', buttons: (AlertButton | string)[] = ['OK']) {
        const alert = await this.alertController.create({header, message, buttons});
        await alert.present();
    }
}
