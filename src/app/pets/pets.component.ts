import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from 'node_modules/@angular/router';

import { Pet } from '../models/pet.model';
import { PetsService } from './pets.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  pets: Pet[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private petsService: PetsService
  ) {}

  ngOnInit() {
    this.petsService.petsChanged.subscribe(pets => {
      this.pets = pets;
    });
    this.petsService.getPets();
  }

  onCreate() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
