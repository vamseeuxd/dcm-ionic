import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
// @ts-ignore
import firebase from 'firebase/app';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    userDetails: firebase.User;
    profileSegment = 'ACCOUNT';

    constructor(private afAuth: AngularFireAuth,
                public alertCtrl: AlertController,
                private router: Router) {
        this.afAuth.user.subscribe(value => {
            this.userDetails = value;
            console.log(value);
        });
    }

    ngOnInit() {
    }

    signInWithGoogle() {
        this.afAuth.auth
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((res: firebase.auth.UserCredential) => {
                console.log(res.user);
                if (res.user.emailVerified) {
                    this.userDetails = res.user.providerData;
                }
            });
    }

    signOut() {
        this.afAuth.auth.signOut().then(res => {
            this.router.navigate(['']);
        });
    }

    async showConfirm() {
        const confirm = await this.alertCtrl.create(
            {
                header: 'SignOut Confirmation',
                message: 'Are you sure, do you want to sign-out',
                buttons: [
                    {
                        text: 'No',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: (blah) => {
                            console.log('Confirm Cancel: blah');
                        }
                    }, {
                        text: 'Yes',
                        handler: () => {
                            this.signOut();
                            console.log('Confirm Okay');
                        }
                    }
                ]
            }
        );
        await confirm.present();

    }
}
