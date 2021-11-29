import { Component, OnInit } from '@angular/core';
import { getCookie } from '../cookie';
import { UiService } from '../ui.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showPage:boolean = false;
  showRateUs:boolean = true;
  constructor(private userService: UserService, private uiService: UiService) {
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
    this.checkLastShowDailyTask();
  }


  closeRateUs(){
    this.showRateUs = false;
  }

  checkLastShowDailyTask():void{
    const sessionID = getCookie("sessionID") || ""; 
    this.userService.getLastShowDailyTask(sessionID).subscribe(
      (response:string)=>{
        var currDate:Date = new Date();
        var splitted = response.split('-');
        if(parseInt(splitted[0])!=currDate.getUTCFullYear()
          || parseInt(splitted[1])!=currDate.getMonth()+1
          || parseInt(splitted[2])!=currDate.getDate()
        ) {
          this.uiService.openDailyChallenge(sessionID);
        }
      }
    );
  }
}
