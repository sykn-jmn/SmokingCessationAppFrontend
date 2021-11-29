import { Component, OnInit } from '@angular/core';
import { getCookie } from '../cookie';
import { GeneralService } from '../general.service';
import { UserOnLeaderBoard } from '../user-on-leaderboard';
import { UserService } from '../user.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  usersOnLeaderboard!: UserOnLeaderBoard[];
  showPage:boolean = false;
  constructor(private generalService: GeneralService,private userService: UserService) {
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
    generalService.getLeaderboard().subscribe(
      (response:UserOnLeaderBoard[])=>{
        console.log(response);
        this.usersOnLeaderboard = response;
      }
    );
  }

  ngOnInit(): void {
  }

} 
