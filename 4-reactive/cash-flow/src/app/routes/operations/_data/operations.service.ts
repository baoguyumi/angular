import { Operation } from './operation.model';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OperationsService {

  private operations: Operation[];
  private operationsCount$: BehaviorSubject<number>;

  constructor() {
    this.operations = [];
    this.operationsCount$ = new BehaviorSubject(0);
    this.emitOperationCount();
  }

  getOperations(): Operation[] {
    return this.operations;
  }

  getOperationById(id): Operation {
    return this.operations.find(o => o._id === id);
  }

  createNewOperation(): Operation {
    return new Operation(new Date(), 0, '', 1, '');
  }

  saveOperation(newOperation: Operation) {
    const operation = this.cloneOperation(newOperation);
    operation._id = new Date().getTime().toString();
    this.operations.push(operation);
    this.emitOperationCount();
  }

  cloneOperation(originalOperation: Operation): Operation {
    const targetOperation = Object.assign({}, originalOperation);
    return targetOperation;
  }

  deleteOperation(operation: Operation) {
    const index: number = this.operations.indexOf(operation);
    if (index !== -1) {
      this.operations.splice(index, 1);
      this.emitOperationCount();
    }
  }

  getOperationsCount$(): Observable<number> {
    return this.operationsCount$.asObservable();
  }

  private emitOperationCount() {
    this.operationsCount$.next(this.operations.length);
  }

}
