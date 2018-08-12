import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Profile } from '../../models/profile.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, OnDestroy {
  profile: Profile;
  isLoading: false;
  profileChangedSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.profileChangedSub = this.authService.profileChanged.subscribe(
      (profile: Profile) => {
        console.log(profile);
        this.profile = profile;
      }
    );
    this.authService.getProfile();
  }

  ngOnDestroy() {
    this.profileChangedSub.unsubscribe();
  }

  onCreate(form: NgForm) {
    const newProfile = new Profile(
      '123456',
      form.value.name,
      form.value.gender,
      form.value.location,
      form.value.numberOfPets
    );

    // this.authService.editProfile(newProfile);
  }
}
