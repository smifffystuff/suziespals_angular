import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile.model';
import { ProfilesService } from '../profiles.service';
import { CommunityService } from '../../community/community.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profiles-list',
  templateUrl: './profiles-list.component.html',
  styleUrls: ['./profiles-list.component.css']
})
export class ProfilesListComponent implements OnInit {
  profiles: Profile[];

  constructor(
    private profileService: ProfilesService,
    private communityService: CommunityService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.profiles = this.profileService.getProfiles();
    this.communityService.postsChanged.subscribe(() => {
      this.profiles = this.profileService.getProfiles();
    });
  }

  onNewProfile() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
