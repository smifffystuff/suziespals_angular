import { Component, OnInit } from '@angular/core';

import { Post } from '../shared/post.model';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {
  posts: Post[] = [
    new Post(
      'post1',
      'profile1',
      'My First Post',
      'This is the first ever test post',
      null
    ),
    new Post(
      'post2',
      'profile1',
      'My Second Post',
      'This is the second test post',
      'https://upload.wikimedia.org/wikipedia/commons/2/26/Yellow_Labrador_puppy_%284165776031%29.jpg'
    )
  ];

  constructor() {}

  ngOnInit() {}

  onPostAdded(newPost: Post) {
    this.posts.push(newPost);
  }
}
