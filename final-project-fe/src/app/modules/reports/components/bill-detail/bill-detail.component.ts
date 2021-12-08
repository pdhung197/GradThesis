import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Bill } from 'src/app/shared/models/bill.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.scss']
})
export class BillDetailComponent implements OnInit {

  public bill: Bill;

  public total = 0;

  public rootPath = `${environment.apiUrl}/bills/`;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    if (this.bill.orders) {
      this.total = 0;
      for (const order of this.bill.orders) {
        this.total += order.total;
      }
    }
  }

}
