import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Table } from 'src/app/shared/models/table.model';
import * as fromApp from 'src/app/store/app.reducer';
import * as OrdersActions from '../../store/orders.actions';
import { TableParams } from '../../store/orders.actions';

@Component({
  selector: 'app-table-edit',
  templateUrl: './table-edit.component.html',
  styleUrls: ['./table-edit.component.scss']
})
export class TableEditComponent implements OnInit {

  public tableForm = new FormGroup({
    tableIndex: new FormControl('', Validators.required),
    capacity: new FormControl(0, Validators.required),
    status: new FormControl('Available', Validators.required)
  });

  public table: Table;

  constructor(public bsModalRef: BsModalRef, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    if (this.table) {
      this.tableForm.patchValue(this.table);
    }
  }

  get f() {
    return this.tableForm.controls;
  }

  public onSubmit(): void {
    const table: Table = {
      id: this.table ? this.table.id : null,
      tableIndex: this.f.tableIndex.value,
      capacity: +this.f.capacity.value,
      status: this.f.status.value
    };

    const id = table.id;

    const tableParams: TableParams = {
      id,
      table
    };

    if (this.table) {
      this.store.dispatch(new OrdersActions.UpdateTable(tableParams));
    } else {
      this.store.dispatch(new OrdersActions.CreateTable(tableParams));
    }

    this.bsModalRef.hide();
  }

}
