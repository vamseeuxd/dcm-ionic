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

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    userDetails: firebase.User;
    isCreateAccount = false;
    usersRef: AngularFireList<firebase.UserInfo>;
    users: Array<firebase.UserInfo>;
    loginDetails = {
        name: '',
        email: '',
        password: '',
    };

    constructor(private afAuth: AngularFireAuth,
                private db: AngularFireDatabase,
                public alertController: AlertController,
                public loadingController: LoadingController,
                private router: Router) {
        this.usersRef = db.list('users');
        const uid = '100105445848125370945';
        this.usersRef.valueChanges().subscribe(data => {
            this.users = data;
        });
    }

    ngOnInit() {
    }

    restLoginDetails() {
        this.loginDetails = {
            name: '',
            email: '',
            password: '',
        };
    }

    haveAnAccountAlreadySignIn() {
        this.isCreateAccount = false;
        this.restLoginDetails();
    }

    doNotHaveAnAccountCreateAccount() {
        this.isCreateAccount = true;
        this.restLoginDetails();
    }

    logFormDetails(loginForm: NgForm) {
        console.log(loginForm);
    }

    async presentLoading() {
        const loading = await this.loadingController.create({
            message: 'Please wait, Login in Progress...'
        });
        return await loading.present();
    }

    signInWithGoogle() {
        this.presentLoading();
        this.afAuth.auth
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((res: firebase.auth.UserCredential) => {
                console.log(res.user);
                if (res.user.emailVerified) {
                    const isUserExists = this.isUserExists(res.user.providerData[0].uid);
                    if (isUserExists) {
                        this.loadingController.dismiss();
                        this.userDetails = res.user.providerData;
                        this.router.navigate(['profile']);
                    } else {
                        this.usersRef.push(res.user.providerData[0]).then((success) => {
                            this.loadingController.dismiss();
                            this.userDetails = res.user.providerData;
                            this.router.navigate(['profile']);
                        }, (error) => {
                            this.loadingController.dismiss();
                        });
                    }
                }
            });
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

    createFreeAccount() {
        this.presentLoading();
        this.afAuth.auth.createUserWithEmailAndPassword(this.loginDetails.email, this.loginDetails.password).then(
            success => {
                const providerData: firebase.UserInfo = {
                    displayName: this.loginDetails.name,
                    email: success.user.providerData[0].email,
                    phoneNumber: success.user.providerData[0].phoneNumber,
                    photoURL: success.user.providerData[0].photoURL,
                    providerId: success.user.providerData[0].providerId,
                    uid: success.user.providerData[0].uid,
                };
                this.usersRef.push(providerData).then((success1) => {
                    this.loadingController.dismiss();
                    this.sendEmailVerificationLink();
                }, (error) => {
                    this.loadingController.dismiss();
                });
            },
            error => {
                console.log(error);
                this.loadingController.dismiss();
                this.showErrorAlert(error.message);
            }
        );
    }

    sendEmailVerificationLink() {
        this.afAuth.auth.currentUser.sendEmailVerification().then(
            success2 => {
                this.loadingController.dismiss().then(success3 => {
                    this.showErrorAlert('Email Verification Sent!');
                });
            }, error => {
                console.log(error);
                this.loadingController.dismiss();
                this.showErrorAlert('Error while sending Email Verification!', 'Alert', [
                    {
                        text: 'OK',
                        handler: () => {
                            this.haveAnAccountAlreadySignIn();
                        }
                    }
                ]);
            });
    }

    singInWithEmailAndPassword() {
        this.presentLoading();
        this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(this.loginDetails.email, this.loginDetails.password).then(
            success => {
                console.log(success);
                if (success.user.emailVerified) {
                    this.loadingController.dismiss();
                    this.userDetails = success.user.providerData;
                    this.router.navigate(['profile']);
                } else {
                    const errorMessage = 'Your Email Verification is pending. ' +
                        'Click ok to send Email Verification Link to your registered email';
                    this.loadingController.dismiss();
                    this.showErrorAlert(errorMessage, 'Alert', [
                        {
                            text: 'Send Email Verification',
                            handler: () => {
                                this.sendEmailVerificationLink();
                            }
                        },
                        {text: 'Cancel'}
                    ]);
                }
            },
            error => {
                console.log(error);
                this.loadingController.dismiss();
                this.showErrorAlert(error.message);
            });
    }

    forgotYourPassword() {
        this.afAuth.auth.sendPasswordResetEmail(this.loginDetails.email).then(
            success => {
                console.log(success);
                this.showErrorAlert('Sent Password Reset Email to your registred Email Address');
            },
            error => {
                console.log(error);
                this.showErrorAlert(error.message);
            }
        );
    }
}
