import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SidebarService } from 'src/app/core/services/sidebar.service';
import { Table } from 'src/app/shared/models/table.model';
import * as fromApp from 'src/app/store/app.reducer';
import { TableEditComponent } from '../../components/table-edit/table-edit.component';
import * as OrdersActions from '../../store/orders.actions';
import { State } from '../../store/orders.reducer';

@Component({
  selector: 'app-tables-manage',
  templateUrl: './tables-manage.component.html',
  styleUrls: ['./tables-manage.component.scss']
})
export class TablesManageComponent implements OnInit {

  public data$: Observable<Table[][]>;

  public currentTime = new Date();

  constructor(
    public sidebarService: SidebarService,
    private store: Store<fromApp.AppState>,
    private bsModalRef: BsModalRef,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.data$ = this.store.select('orders').pipe(
      map((data) => {
        const tempArray: Table[][] = [];
        for (let index = 0; index < data.tables.length; index += 6) {
            const myChunk = data.tables.slice(index, index + 6);
            tempArray.push(myChunk);
        }
        return tempArray;
      })
    );

    this.store.dispatch(new OrdersActions.FetchTables());
  }

  public openEditModal(table: Table): void {
    this.bsModalRef = this.modalService.show(TableEditComponent, {
      initialState: {
        table
      }
    });

    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
