import { Operation } from './../_data/operation.model';
import { OperationsService } from './../_data/operations.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cf-new',
  template: `
    <p>
      new Works!
    </p>
    <form class="container">
      <label for="description">Description</label>
      <input name="description"
        #inputDescription
        [value]="operation.description"
        (change)="operation.description=inputDescription.value"
        type="text"/>
      <label for="amount">Amount</label>
      <input name="amount"
        [(ngModel)]="operation.amount"
        type="number"/>
      <button (click)="saveOperation()">Save</button>
    </form>
    NumOps:{{operationsService.numOps}}
    <blockquote>
      <em>{{ operation | json }}</em>
    </blockquote>
  `,
  styles: []
})
export class NewComponent implements OnInit {
  public operation: Operation;

  constructor(private operationsService: OperationsService) {

  }

  ngOnInit() {
    this.createNewOperation();
  }

  createNewOperation() {
    this.operation = this.operationsService.createNewOperation();
  }

  saveOperation() {
    this.operationsService.saveOperation(this.operation);
    this.createNewOperation();
  }

}
