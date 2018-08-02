import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Profile } from '../../profile.model';

@Component({
  selector: 'app-profile-item',
  templateUrl: './profile-item.component.html',
  styleUrls: ['./profile-item.component.css']
})
export class ProfileItemComponent implements OnInit {
  @Input() profile: Profile;
  @Output() profileSelected = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  onSelected() {
    this.profileSelected.emit();
  }
}
