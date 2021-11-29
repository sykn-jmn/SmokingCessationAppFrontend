import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { setCookie } from '../cookie';
import { LoginResponse } from '../models/loginResponse';
import { UiService } from '../ui.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginError:boolean = false;
  @Output() onLogIn = new EventEmitter<boolean>();
  constructor(private userService:UserService) {
  }

  ngOnInit(): void {
  }

  onSubmit(data:any){
    console.log("clicked")
    this.userService.verifyUser(data.username, data.password).subscribe(
      (response:string)=>{
        if(response==null){
          this.loginError=true;
          console.log("Log In Error 1");
          return;
        }
        console.log(response);
        setCookie("sessionID",response);
        document.location.href = "/home";
      },
      (err:any)=>{
        console.log("Log In Error 2");
        console.log(err);
        this.loginError=true;
      }
    );
  }


  
}
