import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { getCookie } from '../cookie';
import { Cigarette } from '../models/cigarette';
import { SavedMoneyComponent } from '../saved-money/saved-money.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-cigarette-form',
  templateUrl: './cigarette-form.component.html',
  styleUrls: ['./cigarette-form.component.css']
})
export class CigaretteFormComponent implements OnInit {
  savedMoneyComponent!: SavedMoneyComponent;
  cigarettes!: Cigarette[];

 
  constructor(public activeModal: NgbActiveModal, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCigarettes().subscribe(
      (response: Cigarette[])=>{
        this.cigarettes = response;
        console.log(response);
      }
    )
  }

  onSubmit(data: any){
    var sessionID = getCookie("sessionID");
    if(data.cigarette !== undefined && data.timesPerDay !== undefined) {
      console.log(data.cigarette);
      this.userService.updateAmountAddedPerSecond(data.timesPerDay, data.cigarette, sessionID?sessionID:"").subscribe(
        (response: number)=> {
          this.savedMoneyComponent.reloadValues()
        },
        (error: HttpErrorResponse)=>{
          alert(error.message);
        }
      )
      this.activeModal.close()
    }
  }

}
