import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommunityComponent } from './community/community.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { EditProfileComponent } from './auth/edit-profile/edit-profile.component';
import { PetsComponent } from './pets/pets.component';
import { PetsNewComponent } from './pets/pets-new/pets-new.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/message-board', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'edit-profile', component: EditProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

// children: [
//   { path: '', component: ProfileStartComponent },
//   { path: 'new', component: ProfileEditComponent },
//   { path: ':id', component: ProfileDetailComponent },
//   { path: ':id/edit', component: ProfileEditComponent }
// ]
