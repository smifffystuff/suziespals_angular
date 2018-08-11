import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Profile } from './../../models/profile.model';
import { ProfileService } from './../profile.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {
  profile: Profile;
  isLoading: false;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {}

  onCreate(form: NgForm) {
    const newProfile = new Profile(
      '123456',
      form.value.name,
      form.value.gender,
      form.value.location,
      form.value.numberOfPets,
      []
    );

    this.profileService.createProfile(newProfile);
  }
}
