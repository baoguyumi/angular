import { FormBuilder } from '@angular/forms';
import { Http } from '@angular/http';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'app/security.service';

@Component({
  selector: 'cf-login',
  template: `
    <form [formGroup]="loginForm"
        class="container">
    <section name="email-control">
      <label for="email">Email:</label>
      <input formControlName="email"
             type="email" />
      <small *ngIf="loginForm.get('email').invalid"
             class="float-right">
             email is required
      </small>
    </section>
    <section name="password-control">
      <label for="password">Password:</label>
      <input formControlName="password"
             type="password" />
      <small *ngIf="loginForm.get('password').invalid"
             class="float-right">
             password is required
      </small>
    </section>
    <button (click)="onRegister()"
      [disabled]="loginForm.invalid">Register</button>
    <button (click)="onLogIn()"
      [disabled]="loginForm.invalid">Log In</button>
    </form>
  `,
  styles: []
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup

  constructor(public security: SecurityService, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  onRegister() {
    const credentials = this.loginForm.value;
    this.security
      .registerUser(credentials)
  }
  onLogIn() {
    const credentials = this.loginForm.value;
    this.security
      .logInUser(credentials)
  }
}
