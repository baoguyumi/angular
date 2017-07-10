import { ValidatorsService } from './../../core/shared/forms/validators.service';
import { Validators } from '@angular/forms';
import { ToolsService } from './../../core/shared/forms/tools.service';
import { SharedModule } from './../../core/shared/shared.module';
import { OperationsService } from './data/operations.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationsRoutingModule } from './operations-routing.module';
import { OperationsComponent } from './operations.component';
import { NewComponent } from './new/new.component';
import { ListComponent } from './list/list.component';
import { RowComponent } from './list/row/row.component';
import { ItemComponent } from 'app/routes/operations/item/item.component';

@NgModule({
  imports: [
    CommonModule,
    OperationsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    OperationsComponent,
    NewComponent,
    ItemComponent,
    ListComponent,
    RowComponent
  ],
  providers: [
    OperationsService,
    ToolsService,
    ValidatorsService
  ]
})
export class OperationsModule { }
