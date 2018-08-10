import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from '../models/post.model';
import { CommunityService } from './community.service';
import { Subscription } from 'rxjs';

import apiEndpoint from '../shared/api_endpoint';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit, OnDestroy {
  posts: Post[];
  private subscription: Subscription;

  constructor(
    private communityService: CommunityService,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    this.posts = this.communityService.getPosts();
    this.subscription = this.communityService.postsChanged.subscribe(
      (newPosts: Post[]) => {
        this.posts = newPosts;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onTestApi() {
    console.log('testing api');

    this.httpClient.post(`${apiEndpoint}/pet-profile`, {}).subscribe(data => {
      console.log(data);
    });
  }
}

// https://ph8lgj65l5.execute-api.us-east-1.amazonaws.com/dev/
