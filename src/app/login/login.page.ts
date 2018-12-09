import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    isCreateAccount = false;
    loginDetails = {
        name: '',
        email: '',
        password: '',
    };

    constructor() {
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
}
