import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../../shared/post.model';

@Component({
  selector: 'app-profile-post-list',
  templateUrl: './profile-post-list.component.html',
  styleUrls: ['./profile-post-list.component.css']
})
export class ProfilePostListComponent implements OnInit {
  @Input() posts: Post[];

  constructor() {}

  ngOnInit() {}
}
