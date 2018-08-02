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
import { CommunityReplyComponent } from './community/community-reply/community-reply.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ProfilesService } from './profiles/profiles.service';
import { CommunityService } from './community/community.service';

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
    CommunityReplyComponent,
    DropdownDirective
  ],
  imports: [BrowserModule, FormsModule, HttpModule],
  providers: [ProfilesService, CommunityService],
  bootstrap: [AppComponent]
})
export class AppModule {}
