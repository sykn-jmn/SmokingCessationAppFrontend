import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UiService } from '../ui.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-main-body',
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.css']
})
export class MainBodyComponent implements OnInit {
  public user!: User;
  @Output() onLogOut = new EventEmitter<boolean>();

  constructor(private userService: UserService, private uiService: UiService) { 
  }

  ngOnInit(): void {
  }

  logout(){
    this.onLogOut.emit(true);

  }

}
