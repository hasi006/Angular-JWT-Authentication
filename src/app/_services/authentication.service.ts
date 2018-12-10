import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, take, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
isValidToken:boolean =false;
token:string;

    constructor(private http: HttpClient) { }

    login(uname: string, pword: string) {

        var obj = {username:uname,password:pword};
        var joj = JSON.stringify(obj);
        var jojb = JSON.parse(joj);

        return this.http.post<any>(`${config.apiUrl}/api/AuthenticateUser/AuthUser`,jojb)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user) {
                    this.token = user;
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    isvalidtoke(token:string,username:string):Observable<boolean>
    {
        //var obj = {token:tok,username:uname};
        //var joj = JSON.stringify(obj);
        //var jojb = JSON.parse(joj);

        return this.http.post<any>(`${config.apiUrl}/api/AuthenticateUser/ValidateToken`,{token,username});
        
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}