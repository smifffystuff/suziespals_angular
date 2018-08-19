import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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
  imageData = 'NOIMAGE';

  constructor(private petsService: PetsService, private router: Router) {}

  ngOnInit() {}

  onCreate(form: NgForm) {
    const newPet = new Pet(
      form.value.name,
      form.value.animalType,
      form.value.breed,
      form.value.gender,
      form.value.age,
      form.value.bio,
      this.imageData === 'NOIMAGE' ? '' : this.imageData
    );

    this.petsService.addPet(newPet);
  }

  onFileSelected(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.imageData = reader.result;
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }
}
