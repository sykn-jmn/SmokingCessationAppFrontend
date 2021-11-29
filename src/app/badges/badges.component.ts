import { Component, OnInit } from '@angular/core';
import { Badge } from '../badge';
import { getCookie } from '../cookie';
import { UserService } from '../user.service';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.css']
})
export class BadgesComponent implements OnInit {
  badges!: Badge[];
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
    this.userService.getUserBadges(sessionID?sessionID:"").subscribe(
      (response:Badge[])=>{
        this.badges = response;
      }
    ),
    (err:any)=>{
      console.log(err);
    }  
  }

  ngOnInit(): void {
  }

}
