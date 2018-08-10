import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Post } from '../../models/post.model';
import { CommunityService } from '../community.service';

@Component({
  selector: 'app-community-post',
  templateUrl: './community-post.component.html',
  styleUrls: ['./community-post.component.css']
})
export class CommunityPostComponent implements OnInit {
  @ViewChild('titleInput')
  titleInputRef: ElementRef;
  @ViewChild('messageInput')
  messageInputRef: ElementRef;

  constructor(private communityService: CommunityService) {}

  ngOnInit() {}

  onAddItem() {
    const postTitle = this.titleInputRef.nativeElement.value;
    const postMessage = this.messageInputRef.nativeElement.value;
    // const newPost = new Post(
    //   new Date().getTime().toString(),
    //   'profile1',
    //   postTitle,
    //   postMessage,
    //   ''
    // );
    // this.communityService.addPost(newPost);
  }
}
