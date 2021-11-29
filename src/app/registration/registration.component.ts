import { Component, OnInit, Output , EventEmitter} from '@angular/core';
import { setCookie } from '../cookie';
import { Cigarette } from '../models/cigarette';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  @Output() onSave =  new EventEmitter<boolean>();
  cigarettes!: Cigarette[];
  invalid: boolean = false;


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCigarettes().subscribe(
      (response: Cigarette[])=>{
        this.cigarettes = response;
        console.log(response);
      }
    )
  }

  onSubmit(data:any){
    this.userService.registerUser(data).subscribe(
      (response:string)=>{
        setCookie("sessionID",response);
        document.location.href = "/selectdp";
      },
      (err)=>{
        console.log(err);
        this.invalid = true;
      }
    )
  }


}
