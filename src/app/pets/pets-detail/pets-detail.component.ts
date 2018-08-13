import { Component, OnInit, Input } from '@angular/core';

import { Pet } from '../../models/pet.model';

@Component({
  selector: 'app-pets-detail',
  templateUrl: './pets-detail.component.html',
  styleUrls: ['./pets-detail.component.css']
})
export class PetsDetailComponent implements OnInit {
  @Input()
  pet: Pet;

  constructor() {}

  ngOnInit() {}
}
