import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsRoutingModule } from './operations-routing.module';
import { OperationsComponent } from './operations.component';
import { NewComponent } from './new/new.component';
import { ListComponent } from './list/list.component';
import { RowComponent } from './list/row/row.component';
import { OperationsService } from 'app/routes/operations/_data/operations.service';
import { SharedModule } from 'app/core/shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    OperationsRoutingModule,
    SharedModule
  ],
  declarations: [
    OperationsComponent, NewComponent, ListComponent, RowComponent],
  providers: []
})
export class OperationsModule { }
