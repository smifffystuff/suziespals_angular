import { Component, OnInit } from '@angular/core';
import { Profile } from './profile.model';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  selectedProfile: Profile;

  constructor() {}

  ngOnInit() {}
}
