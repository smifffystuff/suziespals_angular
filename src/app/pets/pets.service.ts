import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Pet } from './../models/pet.model';
import apiEndpoint from '../shared/api_endpoint';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  pets: Pet[] = [];
  petsChanged = new Subject<Pet[]>();
  petAdded = new Subject<void>();

  constructor(private http: HttpClient, private router: Router) {}

  addPet(pet: Pet) {
    console.log(pet);
    this.http.post(apiEndpoint + '/pets', pet).subscribe(result => {
      console.log('pet added');
      this.pets.push(pet);
      this.petsChanged.next(this.pets);
      this.petAdded.next();
      this.router.navigate(['/pets']);
    });
  }

  getPets() {
    this.http.get(apiEndpoint + '/pets').subscribe((result: Pet[]) => {
      this.pets = result;
      this.petsChanged.next(this.pets);
    });
  }
}
