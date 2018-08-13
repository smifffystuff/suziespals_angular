import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Profile } from '../profile.model';
import { Post } from '../../models/post.model';
import { CommunityService } from '../../community/community.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ProfilesService } from '../profiles.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {
  @ViewChild('titleInput')
  titleInputRef: ElementRef;
  @ViewChild('messageInput')
  messageInputRef: ElementRef;

  profile: Profile;
  id: string;

  addingPost = false;

  constructor(
    private profileService: ProfilesService,
    private communityService: CommunityService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.profile = this.profileService.getProfile(this.id);
    });
  }

  onAddPost() {
    // const postTitle = this.titleInputRef.nativeElement.value;
    // const postMessage = this.messageInputRef.nativeElement.value;
    // const newPost = new Post(
    //   new Date().getTime().toString(),
    //   this.profile.profileId,
    //   postTitle,
    //   postMessage,
    //   ''
    // );
    // this.addingPost = false;
    // this.communityService.addPost(newPost);
  }
}
