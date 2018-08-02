import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output
} from '@angular/core';
import { Post } from '../../shared/post.model';

@Component({
  selector: 'app-community-reply',
  templateUrl: './community-reply.component.html',
  styleUrls: ['./community-reply.component.css']
})
export class CommunityReplyComponent implements OnInit {
  @ViewChild('titleInput') titleInputRef: ElementRef;
  @ViewChild('messageInput') messageInputRef: ElementRef;
  @Output() postAdded = new EventEmitter<Post>();

  constructor() {}

  ngOnInit() {}

  onAddItem() {
    const postTitle = this.titleInputRef.nativeElement.value;
    const postMessage = this.messageInputRef.nativeElement.value;

    this.postAdded.emit(
      new Post(
        new Date().getTime().toString(),
        'profile1',
        postTitle,
        postMessage,
        null
      )
    );
  }
}
