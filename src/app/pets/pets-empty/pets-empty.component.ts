import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pets-empty',
  templateUrl: './pets-empty.component.html',
  styleUrls: ['./pets-empty.component.css']
})
export class PetsEmptyComponent implements OnInit {
  @Input()
  havePets: boolean;

  constructor() {}

  ngOnInit() {
    console.log(this.havePets);
  }
}
