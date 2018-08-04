import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ConfirmEmailComponent } from './auth/confirm-email/confirm-email.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    SignupComponent,
    SigninComponent,
    ConfirmEmailComponent,
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
    ProfileEditComponent
  ],
  imports: [BrowserModule, FormsModule, HttpModule, AppRoutingModule],
  providers: [ProfilesService, CommunityService],
  bootstrap: [AppComponent]
})
export class AppModule {}
