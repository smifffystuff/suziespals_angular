import { uuid } from 'uuid/v1';
export class Image {
  public imageId: string;
  public addedOn: Date;

  constructor(public petId: string, public comment: string) {
    this.imageId = uuid();
    this.addedOn = new Date();
  }
}
