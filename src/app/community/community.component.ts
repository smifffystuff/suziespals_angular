import { Component, OnInit } from '@angular/core';

import { Post } from '../shared/post.model';
import { CommunityService } from './community.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {
  posts: Post[];

  constructor(private communityService: CommunityService) {}

  ngOnInit() {
    this.posts = this.communityService.getPosts();
    this.communityService.postsChanged.subscribe((newPosts: Post[]) => {
      this.posts = newPosts;
    });
  }
}
