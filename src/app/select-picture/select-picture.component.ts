import { Component, OnInit } from '@angular/core';
import { getCookie } from '../cookie';
import { GeneralService } from '../general.service';
import { UserService } from '../user.service';
import { ProfileInfo} from '../models/profileInfo';

@Component({
  selector: 'app-select-picture',
  templateUrl: './select-picture.component.html',
  styleUrls: ['./select-picture.component.css']
})
export class SelectPictureComponent implements OnInit {
  imgSrc!:string;

  ngOnInit(): void {
    let sessionID = getCookie("sessionID");
    this.userService.getProfileInfo(sessionID || "").subscribe(
      (response:ProfileInfo)=>{
        this.toDataUrl(`https://ui-avatars.com/api/?name=${response.username}`,
        (base64:string)=>{ 
          this.imgSrc = base64;
        })
      })
  }

  constructor(private generalService: GeneralService, private userService:UserService){
    const sessionID = getCookie("sessionID");
    userService.checkSession(sessionID||"").subscribe(
      (response:boolean)=>{
        if(!sessionID || !response){
          document.location.href = "/error";
        }
      }
    ); 
  }


  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    console.log(file);
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.imgSrc = reader.result as string;
    });
    reader.readAsDataURL(file);
  }
  
  save(){
    let sessionID = getCookie("sessionID");
    this.generalService.uploadImage(this.imgSrc, sessionID?sessionID:"").subscribe(
      (res) => {
        console.log(res);
        location.href="/home";        
      },
      (err) => {
        console.log(err);
      })
  }

  toDataUrl(url:string, callback:Function) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }
}
