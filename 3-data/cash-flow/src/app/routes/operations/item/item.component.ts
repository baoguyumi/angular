import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router/';
import { Operation } from 'app/routes/operations/_data/operation.model';
import { OperationsService } from 'app/routes/operations/_data/operations.service';

@Component({
  selector: 'cf-item',
  template: `
    <p>
      item Works!
    </p>
    <h3>{{ _id }}</h3>
    <h5>{{ item | json }}</h5>
  `,
  styles: []
})
export class ItemComponent implements OnInit {
  _id: any;
  item: Operation
  constructor(
    private route: ActivatedRoute,
    public operationsService: OperationsService) { }

  ngOnInit() {
    this._id = this.route.snapshot.params['id'];
    this.item = this.operationsService.getOperationById(this._id);
  }

}
