import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Badge } from '../badge';
import { getCookie } from '../cookie';
import { ProfileInfo } from '../models/profileInfo';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileLink:string = "";
  username:string = "";
  city:string = "";
  rank:number = 0;
  dateStarted:string = "";
  badges: Badge[] = [];
  constructor(private userService:UserService) {
  }

  ngOnInit(): void {
    var sessionID = getCookie("sessionID");
    this.profileLink = environment.apiBaseUrl+`/userProfile/${sessionID}`;
    this.userService.getProfileInfo(sessionID?sessionID:"").subscribe(
      (response: ProfileInfo)=>{
        console.log(response)
        this.username = response.username;
        this.city = response.city;
        let date = new Date(response.startingDate);
        this.dateStarted = date.toLocaleString();
        this.rank = response.leaderboardPosition;
      }
    )
    this.userService.getUserBadges(sessionID?sessionID:"").subscribe(
      (response: Badge[])=>{
        this.badges = response;
      }
    )
  }

}
