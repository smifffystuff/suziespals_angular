import uuid from 'uuid/v1';

export class Post {
  public postId: string;
  public postedOn: Date;

  constructor(
    public petId: string,
    public title: string,
    public message: string,
    public imageId: string
  ) {
    this.postId = uuid();
    this.postedOn = new Date();
  }
}
