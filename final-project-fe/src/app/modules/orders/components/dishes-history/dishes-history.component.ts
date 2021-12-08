import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Bill } from 'src/app/shared/models/bill.model';
import { Table } from 'src/app/shared/models/table.model';

@Component({
  selector: 'app-dishes-history',
  templateUrl: './dishes-history.component.html',
  styleUrls: ['./dishes-history.component.scss']
})
export class DishesHistoryComponent implements OnInit {

  public tableId: number;
  public table: Table;
  public bill: Bill;

  public total = 0;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    if (this.bill) {
      this.total = 0;
      for (const order of this.bill.orders) {
        this.total += order.amount * order.dish.price;
      }
    }
  }

}
