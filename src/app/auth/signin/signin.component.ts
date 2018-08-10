import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from './../auth.service';
import { AlertService } from '../../shared/alert/alert.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  isLoading = false;
  didFail = false;
  errors = {};

  subscription: Subscription;
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.authService.authIsLoading.subscribe(
      (isLoading: boolean) => (this.isLoading = isLoading)
    );
    this.authService.authDidFail.subscribe((fail: any) => {
      console.log('failed', fail);
      this.didFail = fail !== null;
      if (this.didFail) {
        this.alertService.error(fail.message);
      }
    });
  }

  onSignin(form: NgForm, isValid: boolean) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signIn(email, password);
    // this.subscription = this.auth.signIn(email, password).subscribe(
    //   data => {
    //     this.alertService.success('Successfully registered');
    //     this.router.navigate(['/']);
    //   },
    //   err => {
    //     this.alertService.error(err.message);
    //   }
    // );
  }
}
