import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from './models/post';
import { UserOnLeaderBoard } from './user-on-leaderboard';



@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getLatestPosts():Observable<Post[]>{
    return this.http.get<Post[]>(this.apiServerUrl+'/latestPosts');
  }

  public getLeaderboard():Observable<UserOnLeaderBoard[]>{
    return this.http.get<UserOnLeaderBoard[]>(this.apiServerUrl+'/leaderboard');
  }

  getRandomInt(min:number, max:number) : number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }

  public uploadImage(base64:string, sessionID:string): Observable<boolean> {
    return this.http.post<boolean>(this.apiServerUrl+'/updateProfileImage', {base64:base64, sessionID:sessionID});
  }
}
