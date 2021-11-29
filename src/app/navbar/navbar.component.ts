import { Component, Input, OnInit } from '@angular/core';
import { getCookie } from '../cookie';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() highlight:string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    var navItem = document.getElementById(this.highlight);
    navItem?.classList.add("highlight");


    var hamburger = document.getElementById("hamburger");
    var navUl = document.getElementById("nav");
    hamburger?.addEventListener("click",()=>{
      navUl?.classList.toggle("show");
    })

  }

  signOut(){
    let sessionID = getCookie("sessionID") || "";
    this.userService.removeSession(sessionID).subscribe(
      (response:any)=>{
        console.log(response);
      }
    )
    document.location.href="/login";
  }

  navigate(loc:string){
    document.location.href=loc;
  }

}
