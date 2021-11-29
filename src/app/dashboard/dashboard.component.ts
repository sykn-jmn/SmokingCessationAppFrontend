import { Component, OnInit } from '@angular/core';
import { getCookie } from '../cookie';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stoppedSmokingDate = new Date(1999,2,10,16,0,0);
  formattedTime: string = '';
  intervalId;

  constructor(private userService: UserService) {
    this.updateStoppedSmokingDate();
    this.intervalId = setInterval(() => this.updateFormattedTime(), 1000);
  }

  updateStoppedSmokingDate(){
    var sessionID = getCookie("sessionID");
    console.log(sessionID);
    this.userService.getStoppedSmokingDate(sessionID?sessionID:"").subscribe(
      (response: string)=>{
        response = response.substring(1,response.length-1)
        var timeDate: string[] = response.split('T')
        var date: string[] = timeDate[0].split('-')
        var time: string[] = timeDate[1].split(':')
        this.stoppedSmokingDate = new Date(Number(date[0]),
        Number(date[1])-1,Number(date[2]),Number(time[0]),Number(time[1]),Number(time[2]));
        console.log("Updated Stopped Smoking Date on Screen")
      },
      (err:any)=>{
        console.log(err);
      }
    )
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }


  smoked(){
    var sessionID = getCookie("sessionID");
    console.log("smoked");
    var date: Date = new Date();
    date.setHours(date.getHours()+8)
    this.userService.setStoppedSmokeDate(date,sessionID?sessionID:"").subscribe(
      (response:any)=>{
        console.log("Updated Stopped Smoking Date on Database")
        console.log(response);
        this.updateStoppedSmokingDate();
      }
    );;
  }

  updateFormattedTime(){
    var millis = new Date().getTime() - this.stoppedSmokingDate.getTime();
    var date: Date = new Date(millis);
    date.setHours(date.getHours() - 8);
    var formatted: string = (date.getFullYear()-1970) + ' Years ';
    formatted += (date.getMonth()) + ' Month' + (date.getMonth()==1?' ':'s ');
    formatted += (date.getDate()-1) + ' Day'  + (date.getDate()-1==1?' ':'s ');
    formatted += (date.getHours()) + ' Hour'  + (date.getHours()==1?' ':'s ');
    formatted += (date.getMinutes()) + ' Minute'  + (date.getMinutes()==1?' ':'s ');
    formatted += (date.getSeconds()) + ' Second'  + (date.getSeconds()==1?' ':'s ');
    this.formattedTime = formatted;
  }

}
