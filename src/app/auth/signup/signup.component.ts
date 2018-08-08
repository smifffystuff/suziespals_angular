import { Component, OnInit } from '@angular/core';
import { NgForm, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { AlertService } from '../../shared/alert/alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  confirming = false;
  user = {
    name: '',
    email: '',
    password: '',
    password2: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {}

  onSignup(form: NgForm, isValid: boolean) {
    const email = form.value.email;
    const name = form.value.name;
    const password = form.value.password;
    const password2 = form.value.password2;
    const confirmationCode = form.value.confirmationCode;

    if (!this.confirming) {
      this.authService.signupUser(name, email, password).subscribe(
        data => {
          this.alertService.success('Successfully registered');
          this.confirming = true;
        },
        err => {
          this.alertService.error(err.message);
        }
      );
    } else {
      this.authService.confirmAuthCode(email, confirmationCode).subscribe(
        data => {
          this.alertService.success('Email address successfully confirmed');
          this.router.navigate(['signin']);
        },
        err => {
          this.alertService.error(err.message);
        }
      );
    }
  }
}
