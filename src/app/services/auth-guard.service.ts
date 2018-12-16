import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AngularFireAuth} from 'angularfire2/auth';
import {map, take, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(
        private router: Router,
        private auth: AngularFireAuth
    ) {
    }

    canActivate(): Observable<boolean> {
        return this.auth.authState.pipe(
            map(authState => {
                if (!authState) {
                    this.router.navigate(['/login']);
                    return false;
                } else {
                    return true;
                }
            }),
            take(1)
        );
    }

}
