import uuid from 'uuid/v1';

import { Image } from './image.model';
import { Post } from './post.model';

export class Pet {
  public petId: string;

  constructor(
    public name: string,
    public animalType: string,
    public breed: string,
    public gender: string,
    public age: string,
    public bio: string,
    public profileImageId: string
  ) {}
}
