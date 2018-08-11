import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private profileService: ProfileService, private router: Router) {}

  ngOnInit() {
    if (this.profileService.getProfile() == null) {
      this.router.navigate(['/create-profile']);
    }
  }
}
