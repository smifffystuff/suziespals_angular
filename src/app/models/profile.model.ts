import { Pet } from './pet.model';

export class Profile {
  constructor(
    public name: string,
    public gender: string,
    public location: string,
    public numberOfPets: number
  ) {}
}
