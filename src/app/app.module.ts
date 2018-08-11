import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
// import { AuthComponent } from './auth/auth.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { ProfilesListComponent } from './profiles/profiles-list/profiles-list.component';
import { ProfileDetailComponent } from './profiles/profile-detail/profile-detail.component';
import { ProfileItemComponent } from './profiles/profiles-list/profile-item/profile-item.component';
import { CommunityComponent } from './community/community.component';
import { CommunityPostComponent } from './community/community-post/community-post.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ProfilesService } from './profiles/profiles.service';
import { CommunityService } from './community/community.service';
import { ProfilePostDetailComponent } from './profiles/profile-detail/profile-post-list/profile-post-detail/profile-post-detail.component';
import { ProfilePostListComponent } from './profiles/profile-detail/profile-post-list/profile-post-list.component';
import { AppRoutingModule } from './app-routing.module';
import { ProfileStartComponent } from './profiles/profile-start/profile-start.component';
import { ProfileEditComponent } from './profiles/profile-edit/profile-edit.component';
import { AuthService } from './auth/auth.service';
import { AlertComponent } from './shared/alert/alert.component';
import { AlertService } from './shared/alert/alert.service';
import { ValidateEqualDirective } from './auth/validate-equal.directive';
import { AuthInerceptor } from './shared/auth.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { CreateProfileComponent } from './profile/create-profile/create-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // AuthComponent,
    SignupComponent,
    SigninComponent,
    ProfilesComponent,
    ProfilesListComponent,
    ProfileDetailComponent,
    ProfileItemComponent,
    CommunityComponent,
    CommunityPostComponent,
    DropdownDirective,
    ProfilePostDetailComponent,
    ProfilePostListComponent,
    ProfileStartComponent,
    ProfileEditComponent,
    AlertComponent,
    ValidateEqualDirective,
    ProfileComponent,
    CreateProfileComponent
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  providers: [
    ProfilesService,
    CommunityService,
    AuthService,
    AlertService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInerceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
