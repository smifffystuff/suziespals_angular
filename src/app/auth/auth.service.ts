import { Injectable } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';

import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  CognitoUserSession
} from 'amazon-cognito-identity-js';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

import poolData from './user_pool_info';

const userPool = new CognitoUserPool(poolData);

@Injectable()
export class AuthService {
  authIsLoading = new BehaviorSubject<boolean>(false);
  authDidFail = new BehaviorSubject<any>(null);
  authSignupSuccess = new BehaviorSubject<boolean>(false);
  authStatusChanged = new Subject<boolean>();
  registeredUser: CognitoUser;

  cognitoUser: CognitoUser;
  token: string;
  name = 'Guest';

  constructor(private router: Router) {}

  signupUser(name: string, email: string, password: string) {
    this.authIsLoading.next(true);
    const dataName = {
      Name: 'name',
      Value: name
    };
    const attrList: CognitoUserAttribute[] = [];
    attrList.push(new CognitoUserAttribute(dataName));
    console.log('sending signup');
    userPool.signUp(email, password, attrList, null, (err, result) => {
      if (err) {
        this.authDidFail.next(err);
        this.authIsLoading.next(false);
        return;
      }
      this.authDidFail.next(null);
      this.authIsLoading.next(false);
      this.authSignupSuccess.next(true);
      this.registeredUser = result.user;
    });
    return;
  }

  confirmAuthCode(email: string, code: string) {
    this.authIsLoading.next(true);
    const user = {
      Username: email,
      Pool: userPool
    };

    const cognitoUser = new CognitoUser(user);
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        console.log(err);
        this.authDidFail.next(err);
        this.authIsLoading.next(true);
        return;
      }
      this.authDidFail.next(null);
      this.authIsLoading.next(false);
      this.router.navigate(['/signin']);
    });
  }

  signIn(email: string, password: string) {
    this.authIsLoading.next(true);
    const authData = {
      Username: email,
      Password: password
    };

    const authenticaitonDetails = new AuthenticationDetails(authData);

    const userData = {
      Username: email,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    const that = this;
    cognitoUser.authenticateUser(authenticaitonDetails, {
      onSuccess: function(result: CognitoUserSession) {
        console.log('success', result);
        that.authStatusChanged.next(true);
        this.authDidFail.next(null);
        that.authIsLoading.next(false);
        console.log(result);
      },
      onFailure: function(err) {
        console.log('failure', err);
        this.authDidFail.next(err);
        // that.authIsLoading.next(false);
        // console.log(err);
      }
    });
  }
  getAuthenticatedUser() {
    return userPool.getCurrentUser();
  }

  logOut() {
    this.getAuthenticatedUser().signOut();
    this.authStatusChanged.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    const user = this.getAuthenticatedUser();
    const obs = Observable.create(observer => {
      if (!user) {
        observer.next(false);
      } else {
        user.getSession((err, session) => {
          if (err) {
            observer.next(false);
          } else {
            if (session.isValid()) {
              observer.next(true);
            } else {
              observer.next(false);
            }
          }
        });
      }
      observer.complete();
    });
    return obs;
  }

  initAuth() {
    this.isAuthenticated().subscribe(auth => this.authStatusChanged.next(auth));
  }
}
