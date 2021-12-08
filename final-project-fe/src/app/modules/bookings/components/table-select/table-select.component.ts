import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/shared/models/booking.model';
import { AssignTableParams, SearchBookings } from '../../store/bookings.actions';
import * as BookingsActions from '../../store/bookings.actions';
import * as fromApp from 'src/app/store/app.reducer';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Table } from 'src/app/shared/models/table.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-table-select',
  templateUrl: './table-select.component.html',
  styleUrls: ['./table-select.component.scss']
})
export class TableSelectComponent implements OnInit {

  public booking: Booking;
  public params: SearchBookings;
  public disabled = false;
  public tables: Table[][];

  public tables$: Observable<Table[][]>;

  public tableId: number;

  constructor(public bsModalRef: BsModalRef, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.tables$ = this.store.select('bookings').pipe(
      map((data) => {
        const tempArray: Table[][] = [];
        for (let index = 0; index < data.tables.length; index += 4) {
          const myChunk = data.tables.slice(index, index + 4);
          tempArray.push(myChunk);
        }

        this.tables = tempArray;

        return tempArray;
      })
    );

    if (this.booking) {
      this.tableId = this.booking.tableId;
      this.store.dispatch(new BookingsActions.FetchTables(this.booking.id));
    }
  }

  public onSubmit(): void {
    const assignTableParams: AssignTableParams = {
      bookingId: this.booking.id,
      tableId: this.tableId,
      params: this.params
    };

    this.store.dispatch(new BookingsActions.AssignTable(assignTableParams));
    this.bsModalRef.hide();
  }

  public onSelectTable(tableId: number, index: number): void {
    this.tableId = tableId;
    const table = this.tables[index].find((t) => {
      return t.id === tableId;
    });
    this.disabled = !table.canBook;
  }

}
