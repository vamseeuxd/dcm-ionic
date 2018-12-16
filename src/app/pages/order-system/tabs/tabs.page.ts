import {Component} from '@angular/core';
import {LoginService} from '../../public/login/login.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage {
    constructor(private loginService: LoginService) {

    }

    logOut() {
        this.loginService.signOut();
    }
}
