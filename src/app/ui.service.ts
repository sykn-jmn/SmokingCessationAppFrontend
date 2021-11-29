import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CigaretteFormComponent } from './cigarette-form/cigarette-form.component';
import { DailychallengesComponent } from './dailychallenges/dailychallenges.component';
import { AppComponent } from './app.component';
import { SavedMoneyComponent } from './saved-money/saved-money.component';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  constructor(private modalService: NgbModal, private userService: UserService) { }

  openDailyChallenge(sessionID:string) {
    this.userService.getDailyChallenge(sessionID).subscribe(
      (response:string)=>{
        if(response !== ''){
          const modalRef = this.modalService.open(DailychallengesComponent);
          modalRef.componentInstance.challenge = response;
        }
      }
    );
  }

  openCigaretteForm(savedMoneyComponent: SavedMoneyComponent) {
    const modalRef = this.modalService.open(CigaretteFormComponent);
    modalRef.componentInstance.savedMoneyComponent = savedMoneyComponent;
  }
}
