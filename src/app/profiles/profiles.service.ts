import { Profile } from './profile.model';

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
      'I am a beatifull little puppy (at the moment)',
      'https://upload.wikimedia.org/wikipedia/commons/2/26/Yellow_Labrador_puppy_%284165776031%29.jpg'
    ),
    new Profile(
      'profile2',
      'user1',
      'Suzie Again',
      'Dog',
      'Labrador',
      'Female',
      '14 weeks',
      'I am a beatifull little puppy (at the moment)',
      'https://upload.wikimedia.org/wikipedia/commons/2/26/Yellow_Labrador_puppy_%284165776031%29.jpg'
    )
  ];

  getProfiles(): Profile[] {
    return this.profiles.slice();
  }
}
