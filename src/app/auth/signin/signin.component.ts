import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import { AlertService } from '../../shared/alert/alert.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  subscription: Subscription;
  constructor(
    private auth: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {}

  onSignin(form: NgForm, isValid: boolean) {
    const email = form.value.email;
    const password = form.value.password;
    this.subscription = this.auth.signIn(email, password).subscribe(
      data => {
        this.alertService.success('Successfully registered');
        this.router.navigate(['/']);
      },
      err => {
        this.alertService.error(err.message);
      }
    );
  }
}
