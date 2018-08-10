import uuid from 'uuid/v1';

export class Like {
  public likeId: string;
  constructor(public postId: string, public petId: string) {
    this.likeId = uuid();
  }
}
