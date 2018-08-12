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
  isLoading = false;
  didFail = false;
  confirming = false;
  user = {
    email: '',
    name: '',
    gender: '',
    location: '',
    numberOfPets: 0,
    password: '',
    password2: ''
  };

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
      this.didFail = fail !== null;
      if (this.didFail) {
        this.alertService.error(fail.message);
      }
    });
    this.authService.authSignupSuccess.subscribe(
      (success: boolean) => (this.confirming = success)
    );
  }

  onSignup(form: NgForm, isValid: boolean) {
    console.log(this.user);
    const email = form.value.email;
    const name = form.value.name;
    const gender = form.value.gender;
    const location = form.value.location;
    const numberOfPets = form.value.numberOfPets;
    const password = form.value.password;
    const password2 = form.value.password2;
    const confirmationCode = form.value.confirmationCode;

    if (!this.confirming) {
      this.authService.signupUser(name, email,location, gender, numberOfPets, password);
    } else {
      this.authService.confirmAuthCode(email, confirmationCode);
    }
  }
}
