import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AlertService } from './shared/alert/alert.service';
import { Alert } from './shared/alert/alert.model';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthenticated = false;

  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.authStatusChanged.subscribe(authenticated => {
      this.isAuthenticated = authenticated;
      if (authenticated) {
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/']);
      }
    });
    this.authService.initAuth();
  }
}
