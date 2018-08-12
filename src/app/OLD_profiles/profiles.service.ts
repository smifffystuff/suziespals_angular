import { Injectable } from '@angular/core';
import { Profile } from './profile.model';
import { CommunityService } from '../community/community.service';

@Injectable()
export class ProfilesService {
  private profiles: Profile[] = [
    new Profile(
      'profile1',
      'user1',
      'Suzie',
      'Dog',
      'Labrador',
      'Female',
      '14 weeks',
      'I am a beautiful little puppy (at the moment)',
      'https://upload.wikimedia.org/wikipedia/commons/2/26/Yellow_Labrador_puppy_%284165776031%29.jpg',
      []
    ),
    new Profile(
      'profile2',
      'user1',
      'Suzie Again',
      'Dog',
      'Labrador',
      'Female',
      '14 weeks',
      'I am a beautiful little puppy (at the moment)',
      'https://upload.wikimedia.org/wikipedia/commons/2/26/Yellow_Labrador_puppy_%284165776031%29.jpg',
      []
    )
  ];

  constructor(private communityService: CommunityService) {}

  getProfiles(): Profile[] {
    const profiles = this.profiles.slice();
    profiles.forEach(profile => {
      profile.posts = this.communityService.getProfilePosts(profile.profileId);
    });
    return profiles;
  }

  getProfile(id: string): Profile {
    return this.profiles.find(p => p.profileId === id);
  }
}
