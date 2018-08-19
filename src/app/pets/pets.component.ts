import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from 'node_modules/@angular/router';

import { Pet } from '../models/pet.model';
import { PetsService } from './pets.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit, OnDestroy {
  pets: Pet[] = [];
  mode = 'select';

  petsChangedSub: Subscription;
  petAddedSub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private petsService: PetsService
  ) {}

  ngOnInit() {
    this.petsChangedSub = this.petsService.petsChanged.subscribe(pets => {
      this.pets = pets;
    });
    this.petAddedSub = this.petsService.petAdded.subscribe(() => {
      this.mode = 'select';
    });
    this.petsService.getPets();
  }

  ngOnDestroy() {
    this.petsChangedSub.unsubscribe();
    this.petAddedSub.unsubscribe();
  }

  onCreate() {
    this.mode = 'create';
  }
}
