import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../../../models/post.model';

@Component({
  selector: 'app-profile-post-detail',
  templateUrl: './profile-post-detail.component.html',
  styleUrls: ['./profile-post-detail.component.css']
})
export class ProfilePostDetailComponent implements OnInit {
  @Input()
  post: Post;

  constructor() {}

  ngOnInit() {}
}
