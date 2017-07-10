import { SharedModule } from './core/shared/shared.module';
import { LayoutModule } from './core/layout/layout.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BusService } from 'app/bus.service';
import { Http, XHRBackend, RequestOptions, HttpModule } from '@angular/http';
import { HttpService } from 'app/http.service';
import { SecurityService } from 'app/security.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    LayoutModule,
    SharedModule
  ],
  providers: [
    BusService,
    {
      provide: Http,
      useClass: HttpService,
      deps: [XHRBackend, RequestOptions, BusService]
    },
    SecurityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
