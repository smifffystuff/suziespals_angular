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
import { PostsComponent } from './posts/posts.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostComponent } from './posts/post/post.component';
import { ProfilesListComponent } from './profiles/profiles-list/profiles-list.component';
import { ProfileDetailComponent } from './profiles/profile-detail/profile-detail.component';
import { ProfileItemComponent } from './profiles/profiles-list/profile-item/profile-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    SignupComponent,
    SigninComponent,
    ConfirmEmailComponent,
    ProfilesComponent,
    PostsComponent,
    PostsListComponent,
    PostCreateComponent,
    PostComponent,
    ProfilesListComponent,
    ProfileDetailComponent,
    ProfileItemComponent
  ],
  imports: [BrowserModule, FormsModule, HttpModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
