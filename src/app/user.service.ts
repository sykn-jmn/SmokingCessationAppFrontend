import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http' 
import { environment } from 'src/environments/environment';
import { Badge } from './badge';
import { SavedMoneyComponent } from './saved-money/saved-money.component';
import { User } from './user';
import { map } from 'rxjs/operators';
import { SavedMoneyData } from './models/SavedMoneyData';
import { LoginResponse } from './models/loginResponse';
import { UserOnLeaderBoard } from './user-on-leaderboard';
import { Cigarette } from './models/cigarette';
import { ProfileInfo } from './models/profileInfo';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userDetails?: LoginResponse;
  private apiServerUrl = environment.apiBaseUrl;
  userId!:number;
  amountAddedPerSecond = 0.005;
  

  constructor(private http: HttpClient) { }

  public removeSession(sessionID:string):Observable<any>{
    return this.http.post<any>(this.apiServerUrl+"/removeSession/",sessionID);
  }

  public checkSession(sessionID:string):Observable<boolean>{
    return this.http.get<boolean>(this.apiServerUrl+"/checkSession/"+sessionID);
  }

  public addPost(title:string, body:string, sessionID:string):Observable<boolean>{
    var requestBody = {title:title, body:body,sessionID:sessionID};
    return this.http.post<boolean>(this.apiServerUrl+"/post",requestBody);
  }

  public addComment(comment:string,postId:number, sessionID:string):Observable<boolean>{
    var requestBody = {comment:comment,postId:postId,sessionID:sessionID};
    console.log(requestBody);
    return this.http.post<boolean>(this.apiServerUrl+"/addComment", requestBody)
  }

  public getProfileInfo(sessionID:string): Observable<ProfileInfo>{
    return this.http.get<ProfileInfo>(this.apiServerUrl+`/profileInfo/${sessionID}`);
  }

  public registerUser(data:any):Observable<string>{
    // @ts-ignore
    return this.http.post<string>(this.apiServerUrl+'/registerUser', data,{responseType:'text'});
  }

  public verifyUser(username:string, password: string):Observable<string>{
    // @ts-ignore
    return this.http.post<string>(this.apiServerUrl+'/login',{username:username, password:password},{responseType:'text'});
  }
 
  public setStoppedSmokeDate(date:Date, sessionID: string):Observable<any>{
    var dateString = date.toISOString();
    return this.http.post<any>(this.apiServerUrl+'/setStoppedSmokingDate',{sessionID:sessionID, stoppedSmokingDate:dateString});
  }

  public getLastShowDailyTask(sessionID:string):Observable<string>{
    // @ts-ignore
    return this.http.get<string>(this.apiServerUrl+'/dailyTask/'+sessionID, {responseType:'text'});
  }

  public getSavedMoneyData(sessionID:string):Observable<SavedMoneyData>{ 
    return this.http.get<SavedMoneyData>(this.apiServerUrl + '/savedMoneyData/' + sessionID);
  }

  public getStoppedSmokingDate(sessionID: string):Observable<string>{
    // @ts-ignore
    return this.http.get<number>(this.apiServerUrl + '/stoppedSmokingDate/'+sessionID, {responseType:'text'});
  }

  public updateAmountAddedPerSecond(timesADay:number, cigarette: Cigarette, sessionID: string):Observable<number>{
    return this.http.post<number>(this.apiServerUrl+'/smokingData',{sessionID:sessionID, cigarette: cigarette, timesADay:timesADay});
  }

  public getUserBadges(sessionID: string): Observable<Badge[]>{
    return this.http.get<Badge[]>(this.apiServerUrl+'/badges/'+sessionID);
  }

  public getCigarettes(): Observable<Cigarette[]>{
    return this.http.get<Cigarette[]>(this.apiServerUrl+'/cigarettes')
  }

  public getDailyChallenge(sessionID:string):Observable<string>{
    // @ts-ignore
    return this.http.get<string>(this.apiServerUrl + '/randomChallenge/'+sessionID, {responseType: 'text'})
    
    //return this.challengeArray[Math.floor(Math.random() * this.challengeArray.length)];
  }

  challengeArray = [
  "Urges for tobacco are likely to be strongest in the situations where you smoked or chewed tobacco most often, such as at parties or bars, or while feeling stressed or sipping coffee. Identify your trigger situations and have a plan in place to avoid them entirely or get through them without using tobacco.", 
  "If you feel like you're going to give in to your tobacco craving, tell yourself that you must first wait 10 more minutes — and then do something to distract yourself for that period of time. Try going to a public, smoke-free zone. These simple tricks may be enough to derail your tobacco craving.", 
  "Give your mouth something to do to fight a tobacco craving. Chew on sugarless gum or hard candy, or munch on raw carrots, celery, nuts or sunflower seeds — something crunchy and satisfying.", 
  "Physical activity can help distract you from tobacco cravings and reduce their intensity. Even short burst of physical activity — such as running up and down the stairs a few times — can make a tobacco craving go away. Get out for a walk or jog.", 
  "Smoking may have been your way to deal with stress. Resisting a tobacco craving can itself be stressful. Take the edge off stress by practicing relaxation techniques, such as deep-breathing exercises, muscle relaxation, yoga, visualization, massage or listening to calming music.",
  "Touch base with a family member, friend or support group member for help in your effort to resist a tobacco craving. Chat on the phone, go for a walk together, share a few laughs, or get together to commiserate about your cravings. A free telephone quit line — 800-QUIT-NOW (800-784-8669) — provides support and counseling",
  "Join an online stop-smoking program. Or read a quitter's blog and post encouraging thoughts for someone else who might be struggling with tobacco cravings. Learn from how others have handled their tobacco cravings.",
  "Remember, trying something to beat the urge is always better than doing nothing. And each time you resist a tobacco craving, you're one step closer to being totally tobacco-free."
];
}
