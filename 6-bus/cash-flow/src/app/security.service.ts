import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BusService } from 'app/bus.service';
import { Router } from '@angular/router';
import { environment } from './../environments/environment';

@Injectable()
export class SecurityService {
  private userTokenKey = 'userToken';
  private urlLogin = 'pub/login';
  private urlRegister = 'pub/register';

  constructor(private bus: BusService, private http: Http, private router: Router) {
    console.log('SecurityService');
    this.onSecurityErrNavigateToLogin();
  }

  registerUser(credentials: IUserCredential) {
    this.http
      .post(this.urlRegister, credentials)
      .subscribe(r => {
        this.saveUserToken(r);
      });
  }

  logInUser(credentials: IUserCredential) {
    this.http
      .post(this.urlLogin, credentials)
      .subscribe(r => {
        this.saveUserToken(r);
      });
  }

  logOutUser() {
    localStorage.removeItem(this.userTokenKey);
    this.bus.emitUserToken(null);
    this.bus.emit('logged out!!');
    this.navigateTo(['/login']);
  }

  private onSecurityErrNavigateToLogin() {
    this.bus
      .getSecurityErr$()
      .subscribe(err => {
        console.log('onSecurityErrNavigateToLogin', err);
        this.navigateTo(['/login']);
      });
  }

  public checkUserStatus() {
    const userToken: string = localStorage.getItem(this.userTokenKey);
    this.bus.emitUserToken(userToken);
  }

  private saveUserToken(response) {
    const userToken: string = response.json();
    localStorage.setItem(this.userTokenKey, userToken);
    this.bus.emitUserToken(userToken);
    this.bus.emit('logged in!!');
    this.navigateTo(['/']);
  }

  private navigateTo(target: any, args?: any) {
    console.log('navigateTo', target);
    this.router.navigate(target);
  }
}

export interface IUserCredential {
  email: string;
  password: string;
}
