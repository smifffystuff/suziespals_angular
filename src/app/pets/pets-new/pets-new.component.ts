import { Component, OnInit } from '@angular/core';
import { NgForm } from 'node_modules/@angular/forms';

import { Pet } from '../../models/pet.model';
import { PetsService } from '../pets.service';

@Component({
  selector: 'app-pets-new',
  templateUrl: './pets-new.component.html',
  styleUrls: ['./pets-new.component.css']
})
export class PetsNewComponent implements OnInit {
  pet: Pet;
  isLoading: false;

  constructor(private petsService: PetsService) {}

  ngOnInit() {}

  onCreate(form: NgForm) {
    const newPet = new Pet(
      form.value.name,
      form.value.animalType,
      form.value.breed,
      form.value.gender,
      form.value.age,
      form.value.bio,
      ''
    );

    this.petsService.addPet(newPet);
  }
}
