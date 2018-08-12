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

import { CognitoIdentityCredentials, config } from 'aws-sdk';

import poolData from './user_pool_info';
import idPoolId from '../shared/id_pool_id';

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
  name, email,location, gender, numberOfPets, password
  signupUser(name: string, email: string, location: string, gender: string, numberOfPets: number, password: string) {
    this.authIsLoading.next(true);
    const dataName = {
      Name: 'name',
      Value: name
    };
    const attrList: CognitoUserAttribute[] = [
      new CognitoUserAttribute({
        Name: 'name',
        Value: name
      }),
      new CognitoUserAttribute({
        Name: 'custom:location',
        Value: location
      }),
      new CognitoUserAttribute({
        Name: 'custom:gender',
        Value: gender
      }),
      new CognitoUserAttribute({
        Name: 'custom:numberOfPets',
        Value: numberOfPets
      }),
      new CognitoUserAttribute({
        Name: 'custom:joined',
        Value: new Date().toISOString();
      })
yes
      yyyy-mm-dd hh:mm:ss timezone
    ];
    console.log(attrList);
    // attrList.push(new CognitoUserAttribute({
    //   Name: 'name',
    //   Value: name
    // }));
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
        this.authIsLoading.next(false);
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
        that.authDidFail.next(null);
        that.authIsLoading.next(false);
        console.log(result);
        config.region = 'us-east-1';
        const loginKey = `cognito-idp.us-east-1.amazonaws.com/${
          poolData.UserPoolId
        }`;
        const creds = new CognitoIdentityCredentials({
          IdentityPoolId: idPoolId,
          Logins: {
            // Change the key below according to the specific region your user pool is in.
            [loginKey]: result.getIdToken().getJwtToken()
          }
        });
        console.log('refreshing');
        creds.refresh(error => {
          if (error) {
            console.error(error);
          } else {
            // Instantiate aws sdk service objects now that the credentials have been updated.
            // example: var s3 = new AWS.S3();
            console.log('Successfully logged!');
          }
        });
      },
      onFailure: function(err) {
        console.log('failure', err);
        that.authDidFail.next(err);
        that.authIsLoading.next(false);
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
  getToken() {
    return new Promise<string>((resolve, reject) => {
      this.getAuthenticatedUser().getSession((err, session) => {
        if (err) {
          resolve(null);
        }
        console.log('BEFORE:', session.getIdToken().getJwtToken());
        config.region = 'us-east-1';
        const loginKey = `cognito-idp.us-east-1.amazonaws.com/${
          poolData.UserPoolId
        }`;
        const creds = new CognitoIdentityCredentials({
          IdentityPoolId: idPoolId,
          Logins: {
            // Change the key below according to the specific region your user pool is in.
            [loginKey]: session.getIdToken().getJwtToken()
          }
        });
        console.log('refreshing');
        creds.refresh(error => {
          if (error) {
            console.error(error);
          } else {
            // Instantiate aws sdk service objects now that the credentials have been updated.
            // example: var s3 = new AWS.S3();
            console.log('Successfully logged!');
            console.log('AFTER:', session.getIdToken().getJwtToken());
          }
        });
        resolve(session.getIdToken().getJwtToken());
      });
    });
  }
}
