import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from './shared/alert/alert.service';
import { Alert } from './shared/alert/alert.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private alertService: AlertService) {}

  ngOnInit() {}
}
