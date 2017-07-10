import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'app/security.service';
import { BusService } from 'app/bus.service';

@Component({
  selector: 'cf-shell',
  template: `
    <cf-top-bar></cf-top-bar>
    <cf-main-content></cf-main-content>
    <aside class="container">
      <em class="row">Messages: </em>
      <code class="row">
        <strong> {{ messages$ | async }}</strong>
      </code>
      <em class="row">Security Err: </em>
      <code class="row">
        <strong> {{ securityErr$ | async }}</strong>
      </code>
    </aside>
  `,
  styles: []
})
export class ShellComponent implements OnInit {
  public messages$;
  public securityErr$;

  constructor(private security: SecurityService, private bus: BusService) { }

  ngOnInit() {
    this.messages$ = this.bus.getMessage$();
    this.securityErr$ = this.bus.getSecurityErr$();
    this.security.checkUserStatus();
  }

}
