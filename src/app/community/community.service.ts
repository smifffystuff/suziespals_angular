import { Post } from '../shared/post.model';
import { Subject } from 'rxjs';

export class CommunityService {
  postsChanged = new Subject<Post[]>();

  private posts: Post[] = [
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

  getPosts(): Post[] {
    return this.posts.slice();
  }

  addPost(newPost: Post) {
    this.posts.push(newPost);
    this.postsChanged.next(this.posts.slice());
  }

  getProfilePosts(profileId: string) {
    return this.posts.filter(p => p.profileId === profileId);
  }
}
