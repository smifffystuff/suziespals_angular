import { Component, OnInit, Input } from '@angular/core';
import { Pet } from '../../models/pet.model';
import { PetsService } from '../pets.service';

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.css']
})
export class PetsListComponent implements OnInit {
  pets: Pet[];
  //  = [
  //   new Pet('xasc', 'adasd', 'asSsa', 'saSAs', 'aSas', 'assa', '')
  // ];

  constructor(private petsService: PetsService) {}

  ngOnInit() {
    console.log('getting pets');
    this.petsService.petsChanged.subscribe(pets => {
      this.pets = pets;
    });
    this.petsService.getPets();
  }
}
