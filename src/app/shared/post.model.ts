export class Post {
  constructor(
    public postId: string,
    public profileId: string,
    public title: string,
    public message: string,
    public image: string
  ) {}
}
