import { Component, OnInit, Input } from '@angular/core';

import { Profile } from '../../profile.model';

@Component({
  selector: 'app-profile-item',
  templateUrl: './profile-item.component.html',
  styleUrls: ['./profile-item.component.css']
})
export class ProfileItemComponent implements OnInit {
  @Input() profile: Profile;

  constructor() {}

  ngOnInit() {}
}
