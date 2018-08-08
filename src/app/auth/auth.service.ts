import { Injectable, OnInit } from '@angular/core';
import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser
} from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs';

import poolData from './user_pool_info';

const userPool = new CognitoUserPool(poolData);

@Injectable()
export class AuthService implements OnInit {
  cognitoUser: CognitoUser;
  token: string;

  constructor() {}

  ngOnInit() {
    this.cognitoUser = this.getAuthenticatedUser();
    console.log(this.cognitoUser);
  }

  signupUser(name: string, email: string, password: string) {
    const dataName = {
      Name: 'name',
      Value: 'name'
    };
    const nameAtt = [new CognitoUserAttribute(dataName)];

    return Observable.create(observer => {
      userPool.signUp(email, password, nameAtt, null, (err, result) => {
        if (err) {
          console.log('signUp Error', err);
          observer.error(err);
        } else {
          this.cognitoUser = result.user;
          console.log('signup success', result);
          observer.next(result);
          observer.complete();
        }
      });
    });
  }

  confirmAuthCode(email: string, code: string) {
    const user = {
      Username: email,
      Pool: userPool
    };
    return Observable.create(observer => {
      const cognitoUser = new CognitoUser(user);
      cognitoUser.confirmRegistration(code, true, function(err, result) {
        if (err) {
          console.log(err);
          observer.error(err);
        }
        console.log('confirmAuthCode() success', result);
        observer.next(result);
        observer.complete();
      });
    });
  }

  signIn(email: string, password: string) {
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

    return Observable.create(observer => {
      cognitoUser.authenticateUser(authenticaitonDetails, {
        onSuccess: function(result) {
          console.log(result);
          observer.next(result);
        },
        onFailure: function(err) {
          console.log(err);
          observer.error(err);
        }
      });
    });
  }

  isLoggedIn() {
    return userPool.getCurrentUser() != null;
  }

  getAuthenticatedUser() {
    return userPool.getCurrentUser();
  }

  logOut() {
    this.getAuthenticatedUser().signOut();
    this.cognitoUser = null;
  }

  getToken() {
    return new Promise<string>((resolve, reject) => {
      const authenticatedUser = this.getAuthenticatedUser();
      if (!authenticatedUser) {
        resolve(null);
      }
      authenticatedUser.getSession((err, session) => {
        if (err) {
          resolve(null);
        }
        if (session) {
          resolve(session.getIdToken().getJwtToken());
        } else {
          resolve(null);
        }
      });
    });
  }
}
