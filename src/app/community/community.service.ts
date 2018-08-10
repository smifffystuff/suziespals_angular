import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Post } from '../models/post.model';
import apiUrl from '../shared/api_endpoint';
import { map } from 'rxjs/operators';

@Injectable()
export class CommunityService {
  postsChanged = new Subject<Post[]>();

  private posts: Post[] = [];

  constructor(private http: HttpClient) {
    // this.http.get(apiUrl + '/posts').subscribe((posts: any[]) => {
    //   this.posts = posts.map((p: any) => {
    //     return new Post(
    //       p.post_id,
    //       p.pet_profile_id,
    //       p.title,
    //       p.message,
    //       '',
    //       p.posted_on
    //     );
    //   });
    //   this.postsChanged.next(this.posts.slice());
    // });
  }

  getPosts(): Post[] {
    return this.posts.slice();
  }

  addPost(newPost: Post) {
    this.posts.push(newPost);
    this.postsChanged.next(this.posts.slice());
  }

  getProfilePosts(profileId: string) {
    return [];
    // return this.posts.filter(p => p.profileId === profileId);
  }
}
