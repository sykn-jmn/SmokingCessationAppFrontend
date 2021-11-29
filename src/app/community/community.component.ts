import { Component, OnInit } from '@angular/core';
import { getCookie } from '../cookie';
import { UserService } from '../user.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  showPage:boolean = false;
  constructor(private userService: UserService) {
    const sessionID = getCookie("sessionID");
    userService.checkSession(sessionID||"").subscribe(
      (response:boolean)=>{
        if(!sessionID || !response){
          document.location.href = "/error";
        }else{
          this.showPage = true;
        }
      }, (err:any)=>{
        document.location.href = "/error";
      }
    ); 
  }

  ngOnInit(): void {
  }

}
