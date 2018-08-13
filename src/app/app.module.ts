import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { PetsModule } from './pets/pets.module';
import { MessageBoardModule } from './message-board/message-board.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { CommunityComponent } from './community/community.component';
import { CommunityPostComponent } from './community/community-post/community-post.component';
import { AlertComponent } from './shared/alert/alert.component';
import { EditProfileComponent } from './auth/edit-profile/edit-profile.component';

import { DropdownDirective } from './shared/dropdown.directive';
import { ValidateEqualDirective } from './auth/validate-equal.directive';

import { AuthInerceptor } from './shared/auth.interceptor';

import { AuthService } from './auth/auth.service';
import { SharedService } from './shared/shared.service';
import { CommunityService } from './community/community.service';
import { AlertService } from './shared/alert/alert.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent,
    CommunityComponent,
    CommunityPostComponent,
    DropdownDirective,
    AlertComponent,
    ValidateEqualDirective,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    PetsModule,
    MessageBoardModule,
    AppRoutingModule
  ],
  providers: [
    CommunityService,
    AuthService,
    AlertService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInerceptor,
      multi: true
    },
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
