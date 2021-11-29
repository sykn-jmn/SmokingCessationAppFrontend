import { Component, OnInit , Input} from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { User } from '../user';

@Component({
  selector: 'app-dailychallenges',
  templateUrl: './dailychallenges.component.html',
  styleUrls: ['./dailychallenges.component.css']
})
export class DailychallengesComponent implements OnInit {
  @Input() challenge: string = '';

  constructor(public activeModal: NgbActiveModal){}

  ngOnInit(): void {
  }

}
