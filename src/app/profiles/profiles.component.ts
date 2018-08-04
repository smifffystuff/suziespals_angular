import { Component, OnInit } from '@angular/core';
import { Profile } from './profile.model';
import { ProfilesService } from './profiles.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  selectedProfile: Profile;

  constructor(private profileService: ProfilesService) {}

  ngOnInit() {
    this.profileService.profileSelected.subscribe((profile: Profile) => {
      this.selectedProfile = profile;
    });
  }
}
