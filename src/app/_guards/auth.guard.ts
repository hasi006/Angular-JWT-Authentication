import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


import {AuthenticationService} from '../_services/authentication.service';
import { Observable,of, pipe } from 'rxjs';
import { take,first, map } from 'rxjs/operators';
import { promises } from 'fs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
token:string;
isvalidroute:boolean = false;
error:string;


    constructor(private router: Router, private auhtService:AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean>{
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            //this.router.navigate(['/user']);//, { queryParams: { returnUrl: state.url }});
            //this.router.navigate(['/user']);
            var isgranted = false;

            var token = localStorage.getItem('currentUser');
            var userName = localStorage.getItem('username');
            //console.log('xxxxx-'+a);
            
            return this.auhtService.isvalidtoke(token,userName).pipe(map((data)=>{
                //console.log(data);
                if(data)
                {
                    //console.log(data);
                    return true;
                }
                else
                {
                    //console.log(data);
                    //this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
                    return false;
                }
            }));
    }
    else
    {
        var token = route.queryParamMap.get('token');
        var username = route.queryParamMap.get('username');
        if(token === '' || token === undefined || token == null)
        {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return of(false);
        }
        else
        {
            return this.auhtService.isvalidtoke(token,username).pipe(map((data)=>{
                //console.log(data);
                if(data)
                {
                    localStorage.setItem('username',JSON.stringify(username));
                    localStorage.setItem('currentUser',JSON.stringify(token));
                    //console.log(data);
                    return true;
                }
                else
                {
                    //console.log(data);
                    //this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
                    return false;
                }
            }));
        }
    }
}

}