import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Pet } from './../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  pets: Pet[] = [];
  petsChanged = new Subject<Pet[]>();

  constructor() {}

  addPet(pet: Pet) {
    console.log(pet);
    this.pets.push(pet);
    this.petsChanged.next(this.pets);
  }

  getPets() {
    this.petsChanged.next(this.pets);
  }
}
