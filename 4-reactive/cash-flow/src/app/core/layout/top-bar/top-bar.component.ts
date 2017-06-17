import { Component, OnInit } from '@angular/core';
import { OperationsService } from 'app/routes/operations/_data/operations.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'cf-top-bar',
  template: `
    <nav>
      <a routerLink="/">->Home</a>
      <a routerLink="/operations">   ->Operations</a>
      <a routerLink="/about">   ->About</a>
      <a href=""> NumOps: {{numOps}}</a>
      <a href=""> NumOps: {{numOps$ | async}}</a>
    </nav>
  `,
  styles: []
})
export class TopBarComponent implements OnInit {
  public numOps: number;
  public numOps$: Observable<number>;
  constructor(public operationsService: OperationsService) { }
  ngOnInit() {
    this.numOps$ = this.operationsService.getOperationsCount$();
    this.operationsService
      .getOperationsCount$()
      .subscribe(numOps => {
        this.numOps = numOps;
      })
  }

}
