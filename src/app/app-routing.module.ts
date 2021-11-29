import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BadgesComponent } from './badges/badges.component';
import { CommunityComponent } from './community/community.component';
import { HelpComponent } from './help/help.component';
import { HomeComponent } from './home/home.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { LoginComponent } from './login/login.component';
import { MainBodyComponent } from './main-body/main-body.component';
import { RegistrationComponent } from './registration/registration.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SelectPictureComponent } from './select-picture/select-picture.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'main',component:MainBodyComponent},
  {path:'login', component:LoginComponent},
  {path:'signup',component:RegistrationComponent},
  {path:'home',component:HomeComponent},
  {path:'badges',component:BadgesComponent},
  {path:'leaderboard',component:LeaderboardComponent},
  {path:'help',component:HelpComponent},
  {path:'community',component:CommunityComponent},
  {path:'error',component:ErrorPageComponent},
  {path:'selectdp',component:SelectPictureComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
