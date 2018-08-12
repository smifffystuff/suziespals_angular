import { Pet } from './pet.model';

export class Profile {
  constructor(
    public userId: string,
    public name: string,
    public gender: string,
    public location: string,
    public numberOfPets: number
  ) {}
}
