import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { Bill } from 'src/app/shared/models/bill.model';
import * as fromApp from 'src/app/store/app.reducer';
import { environment } from 'src/environments/environment';
import * as OrdersActions from '../../store/orders.actions';
import { State } from '../../store/orders.reducer';

@Component({
  selector: 'app-checkout-table',
  templateUrl: './checkout-table.component.html',
  styleUrls: ['./checkout-table.component.scss']
})
export class CheckoutTableComponent implements OnInit, AfterViewChecked, OnDestroy {

  public data$: Observable<State>;
  public tableId: number;
  public total = 0;

  @Output() bill = new EventEmitter<Bill>();

  public rootPath = `${environment.apiUrl}/bills/`;

  constructor(
    public store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private bsModalRef: BsModalRef,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.tableId = +this.route.snapshot.params.id;

    this.data$ = this.store.select('orders')
      .pipe(
        tap((data) => {
          if (data.bill?.orders) {
            this.total = 0;
            for (const order of data.bill.orders) {
              this.total += order.total;
            }
          }
          this.bill.emit(data.bill);
        })
      );

    this.store.dispatch(new OrdersActions.GetBill(this.tableId));
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.total = 0;
  }

  public onCheckout(): void {
    this.bsModalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        prompt: 'Bạn có chắc chắn thanh toán cho bàn này?',
        callback: (result) => {
          if (result === true) {
            this.store.dispatch(new OrdersActions.CheckoutBill(this.tableId));
          }
        }
      }
    });
  }
}
