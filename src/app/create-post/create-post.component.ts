import { Component, OnInit } from '@angular/core';
import { getCookie } from '../cookie';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  onSubmit(postData: any){
    var sessionID = getCookie("sessionID");
    sessionID = sessionID?sessionID:""; 
    this.userService.addPost(postData.title, postData.body, sessionID).subscribe(
      (response:boolean)=>{
        location.href="/community";
      }
    ) 
  }

}
