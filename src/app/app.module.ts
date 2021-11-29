import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DailychallengesComponent } from './dailychallenges/dailychallenges.component';
import { CigaretteFormComponent } from './cigarette-form/cigarette-form.component';
import { SavedMoneyComponent } from './saved-money/saved-money.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { BadgesComponent } from './badges/badges.component';
import { MainBodyComponent } from './main-body/main-body.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelpComponent } from './help/help.component';
import { RegistrationComponent } from './registration/registration.component';
import { GameComponent } from './game/game.component';
import { ForumComponent } from './forum/forum.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CommunityComponent } from './community/community.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ProfileComponent } from './profile/profile.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { SelectPictureComponent } from './select-picture/select-picture.component';

@NgModule({
  declarations: [
    AppComponent,
    DailychallengesComponent,
    CigaretteFormComponent,
    SavedMoneyComponent,
    LeaderboardComponent,
    BadgesComponent,
    MainBodyComponent,
    LoginComponent,
    DashboardComponent,
    HelpComponent,
    RegistrationComponent,
    GameComponent,
    ForumComponent,
    HomeComponent,
    CommunityComponent,
    NavbarComponent,
    ErrorPageComponent,
    ProfileComponent,
    CreatePostComponent,
    SelectPictureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
