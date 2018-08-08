import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(public authService: AuthService, private router: Router) {}

  doLogout() {
    this.authService.logOut();
    this.router.navigateByUrl('/signin');
  }
}
