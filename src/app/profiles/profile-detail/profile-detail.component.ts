import { Component, OnInit, Input } from '@angular/core';
import { Profile } from '../profile.model';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {
  @Input() profile: Profile;

  constructor() {}

  ngOnInit() {}
}
