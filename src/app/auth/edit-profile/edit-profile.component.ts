import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Profile } from '../../models/profile.model';
import { AuthService } from '../auth.service';
import { AlertService } from '../../shared/alert/alert.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, OnDestroy {
  profile: Profile;
  isLoading: false;
  profileChangedSub: Subscription;

  constructor(
    private authService: AuthService,
    private alertService: AlertService
  ) {}

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
    if (+form.value.numberOfPets > 10 || +form.value.numberOfPets < 0) {
      this.alertService.warn(
        'Number of pets must be greater than 0 and 10 or less'
      );
      return;
    }
    const editedProfile = new Profile(
      form.value.name,
      form.value.gender,
      form.value.location,
      form.value.numberOfPets
    );

    this.authService.editProfile(editedProfile).subscribe((result: any) => {
      if (result.success) {
        this.alertService.success(result.msg);
      } else {
        this.alertService.error(result.msg);
      }
    });
  }
}
