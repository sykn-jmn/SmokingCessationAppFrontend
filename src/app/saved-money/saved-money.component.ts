import { Component, OnInit } from '@angular/core';
import { getCookie } from '../cookie';
import { SavedMoneyData } from '../models/SavedMoneyData';
import { UiService } from '../ui.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-saved-money',
  templateUrl: './saved-money.component.html',
  styleUrls: ['./saved-money.component.css']
})
export class SavedMoneyComponent implements OnInit {
  amountSaved: number = 0;
  amountSavedInAMonth: number = 0;
  amountSavedInAYear: number = 0;
  amountAddedPerSecond: number = 0;
  timesSmokedSinceStart:number = 0;
  secondsSinceStart:number = 0;
  timesADay:number = 0;
  cost:number = 0;
  intervalId:any;

  constructor(private uiService: UiService, private userService: UserService) { 
    this.reloadValues();
    this.intervalId = setInterval(() => this.updateValues(), 1000);
  }

  reloadValues():void{
    var sessionID = getCookie("sessionID");
    console.log(sessionID);
    this.userService.getSavedMoneyData(sessionID?sessionID:"").subscribe(
      (response:SavedMoneyData)=>{
        console.log(response)
        this.amountAddedPerSecond = Number(response.amountAddedPerSecond);
        this.timesSmokedSinceStart = Number(response.timesSmokedSinceStart);
        this.cost = Number(response.cost);
        this.timesADay = Number(response.timesADay)
        this.secondsSinceStart = (Math.abs(new Date().getTime() - new Date(response.startingDate).getTime()))/1000;
        console.log("secondsSinceStart="+this.secondsSinceStart);
        console.log("amoundAddedPerSecond="+this.amountAddedPerSecond);
        console.log("cost="+this.cost);
        this.instantiateValues()
      })
  }

  instantiateValues():void{
    this.amountSaved = (this.secondsSinceStart * this.amountAddedPerSecond ) - (this.timesSmokedSinceStart * this.cost);
    this.amountSavedInAMonth = this.amountSaved + (this.amountAddedPerSecond * 60 * 60 * 24 * 30);
    this.amountSavedInAYear = this.amountSaved + (this.amountAddedPerSecond * 60 * 60 * 24 * 30 * 12);
    console.log("Amount Saved = "+this.amountSaved)
  }

  updateValues():void{
    this.amountSaved += this.amountAddedPerSecond;
    this.amountSavedInAMonth += this.amountAddedPerSecond;
    this.amountSavedInAYear += this.amountAddedPerSecond;
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  formatNumber(amount: number):string {
    return (amount).toLocaleString('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 3
    });
  }

  openSmokingDataForm():void{
    this.uiService.openCigaretteForm(this);    
  }

}
