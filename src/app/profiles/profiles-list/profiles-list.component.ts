import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Profile } from '../profile.model';
import { ProfilesService } from '../profiles.service';

@Component({
  selector: 'app-profiles-list',
  templateUrl: './profiles-list.component.html',
  styleUrls: ['./profiles-list.component.css']
})
export class ProfilesListComponent implements OnInit {
  @Output() profileWasSelected = new EventEmitter<Profile>();
  profiles: Profile[];

  constructor(private profileService: ProfilesService) {}

  ngOnInit() {
    this.profiles = this.profileService.getProfiles();
  }

  onSelected(profile: Profile) {
    this.profileWasSelected.emit(profile);
  }
}
