import { Component, OnInit } from '@angular/core';
import { getCookie } from '../cookie';
import { GeneralService } from '../general.service';
import { Post } from '../models/post';
import { UserService } from '../user.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  posts!: Post[];

  constructor(private generalService:GeneralService, private userService: UserService) {}

  ngOnInit(): void {
    this.refreshPosts();
  }

  refreshPosts(){
    this.generalService.getLatestPosts().subscribe(
      (response:Post[])=>{
        console.log(response);
        this.posts = response;
        console.log(this.posts);
      },
      (err:any)=>{
        console.log(err);
      }
    )
  }

  formatDate(dateString: string):string{
    var date = new Date(dateString);
    return date.toDateString();
  }

  onSubmit(postId: number, data:any) {
    var sessionID = getCookie("sessionID");
    sessionID = sessionID?sessionID:"";
    this.userService.addComment(data.comment,postId,sessionID).subscribe(
      (response:boolean)=>{
        console.log("Submitted");
        this.refreshPosts();
      },
      (err)=>{
        console.log(err);
      }
    )
  }

}
