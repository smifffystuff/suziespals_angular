import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Profile } from '../models/profile.model';
import api_endpoint from '../shared/api_endpoint';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  profile: Profile;

  constructor(private http: HttpClient) {}

  getProfile() {
    return this.profile;
  }

  createProfile(profile: Profile) {
    console.log(profile);

    this.profile = profile;
    this.http.post(api_endpoint + '/profile', profile).subscribe(
      result => {
        console.log(result);
        // this.dataLoadFailed.next(false);
        // this.dataIsLoading.next(false);
        // this.dataEdited.next(true);
      },
      error => {
        console.log(error);
        // this.dataIsLoading.next(false);
        // this.dataLoadFailed.next(true);
        // this.dataEdited.next(false);
      }
    );
  }
}
