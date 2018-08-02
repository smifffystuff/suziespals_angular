import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile.model';

@Component({
  selector: 'app-profiles-list',
  templateUrl: './profiles-list.component.html',
  styleUrls: ['./profiles-list.component.css']
})
export class ProfilesListComponent implements OnInit {
  profiles: Profile[] = [
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
      'Suzie',
      'Dog',
      'Labrador',
      'Female',
      '14 weeks',
      'I am a beatifull little puppy (at the moment)',
      'https://upload.wikimedia.org/wikipedia/commons/2/26/Yellow_Labrador_puppy_%284165776031%29.jpg'
    )
  ];

  constructor() {}

  ngOnInit() {}
}
