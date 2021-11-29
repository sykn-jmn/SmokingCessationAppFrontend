import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SmokingCessationApp';
  active = 'top';
  loggedIn = 0;

  constructor(private userService: UserService){
  }

  save(saved:boolean){
    this.loggedIn = saved?0:2;
  }

  login(loggedIn:boolean){
    this.loggedIn = loggedIn?1:0;
  }

  logout(){
    this.loggedIn = 0;
  }

  signUp(){
    this.loggedIn = 2;
  }


  


}
