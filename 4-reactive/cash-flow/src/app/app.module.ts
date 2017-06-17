import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LayoutModule } from 'app/core/layout/layout.module';
import { SharedModule } from 'app/core/shared/shared.module';
import { OperationsModule } from 'app/routes/operations/operations.module';
import { OperationsService } from 'app/routes/operations/_data/operations.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    SharedModule
  ],
  providers: [OperationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
