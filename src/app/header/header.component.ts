import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.authStatusChanged.subscribe(authenticated => {
      this.isAuthenticated = authenticated;
    });
    this.authService.initAuth();
  }

  doLogout() {
    this.authService.logOut();
    this.router.navigateByUrl('/');
  }
}
