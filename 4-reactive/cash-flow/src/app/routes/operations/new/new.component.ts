import { ValidatorsService } from './../../../core/shared/forms/validators.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Operation } from 'app/routes/operations/_data/operation.model';
import { OperationsService } from 'app/routes/operations/_data/operations.service';
import { FormToolsService } from 'app/core/shared/forms/form-tools.service';

@Component({
  selector: 'cf-new',
  templateUrl: './new.component.html',
  styles: []
})
export class NewComponent implements OnInit {
  public operation: Operation;
  public operationForm: FormGroup;

  constructor(
    public operationsService: OperationsService,
    public formBuilder: FormBuilder,
    public validatorsService: ValidatorsService,
    public toolService: FormToolsService) { }

  ngOnInit() {
    this.createNewOperation();
    this.buildForm();
  }

  createNewOperation() {
    this.operation = this.operationsService.newOperation();
  }

  buildForm() {
    const controls = this.initializeControls();
    this.operationForm = this.formBuilder.group(controls);
  }

  initializeControls() {
    const controls = {
      description: [
        this.operation.description,
        Validators.required
      ],
      amount: [
        this.operation.amount, [
          Validators.required,
          this.validatorsService.positiveNumber
        ]
      ],
      date: [
        this.getDateForControl(this.operation.date),
        Validators.required
      ]
    };
    return controls;
  }

  mustShowErrors(controlName: string) {
    // let hasErrorsToShow = false;
    // const control = this.getControl(controlName);
    // const hasChanges = control.dirty || control.touched;
    // if (hasChanges) {
    //   hasErrorsToShow = control.errors != null;
    // }
    // return hasErrorsToShow;
    return this.toolService
      .mustShowErrors(
      this.operationForm,
      controlName);
  }

  getControl(controlName: string): AbstractControl {
    return this.operationForm.controls[controlName];
  }

  getControlErrors(controlName: string): string {
    let controlErrors = '';
    const control = this.getControl(controlName);
    if (control && control.errors) {
      Object.keys(control.errors).forEach(error => {
        controlErrors += error;
      });
    }
    return controlErrors;
  }

  /*
  positiveNumber(control: AbstractControl) {
    let error = null;
    if (control.value !== undefined && (isNaN(control.value) || control.value < 0)) {
      error = { 'positive': 'Must be a positive number' };
    }
    return error;
  }
*/

  getDateForControl(date: Date): string {
    return date.toISOString().substring(0, 10)
  }

  onSubmit() {
    this.operation = this.operationForm.value;
    this.operationsService.saveOperation(this.operation);
    this.createNewOperation();
  }

}





