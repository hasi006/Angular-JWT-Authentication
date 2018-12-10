import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService } from '../_services';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    users: User[] = [];

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
    }

    redirectTo(){
        var token = localStorage.getItem('currentUser');
        var user = localStorage.getItem('username');
        var isrewrite = true;
        
        window.location.href = "http://aaaaaa/Landing.aspx?token="+token+'&username='+user+'&redirect='+isrewrite;
    }
}