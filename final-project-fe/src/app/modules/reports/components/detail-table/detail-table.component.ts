import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { Bill } from 'src/app/shared/models/bill.model';
import * as fromApp from 'src/app/store/app.reducer';
import { environment } from 'src/environments/environment';
import * as ReportsActions from '../../store/reports.actions';
import { DeleteBillParams, ReportParams } from '../../store/reports.actions';
import { State } from '../../store/reports.reducer';
import { BillDetailComponent } from '../bill-detail/bill-detail.component';

@Component({
  selector: 'app-detail-table',
  templateUrl: './detail-table.component.html',
  styleUrls: ['./detail-table.component.scss']
})
export class DetailTableComponent implements OnInit, OnChanges {

  public searchForm = new FormGroup({
    reportType: new FormControl('bill')
  });

  @Input() dateFrom: string;
  @Input() dateTo: string;

  public data$: Observable<State>;

  public reportParams: ReportParams;
  public currentPage = 1;

  public downloadReportPath = `${environment.apiUrl}/reports/detail/file?`;

  constructor(
    private store: Store<fromApp.AppState>,
    private bsModalRef: BsModalRef,
    private modalService: BsModalService,
    public auth: AuthService) { }

  ngOnInit() {
    this.data$ = this.store.select('reports');
    this.getDetails();

    this.searchForm.get('reportType').valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(() => {
      this.getDetails();
    });
  }

  ngOnChanges() {
    this.getDetails();
  }

  get f() {
    return this.searchForm.controls;
  }

  public getDetails(): void {
    const type = this.f.reportType.value;
    const reportParams: ReportParams = {
      dateFrom: this.dateFrom,
      dateTo: this.dateTo,
      pageSize: 3,
      pageNumber: 1
    };

    if (type === 'material') {
      this.store.dispatch(new ReportsActions.FetchMaterialDetails(reportParams));
    } else {
      this.store.dispatch(new ReportsActions.FetchBillDetails(reportParams));
    }
  }

  public onPageChanged(page: number): void {
    this.reportParams = {
      pageNumber: page,
      pageSize: 3,
      dateFrom: this.dateFrom,
      dateTo: this.dateTo
    };
    this.store.dispatch(new ReportsActions.FetchBillDetails(this.reportParams));
  }

  public openDetailModal(bill: Bill): void {
    this.bsModalRef = this.modalService.show(BillDetailComponent, {
      initialState: {
        bill
      },
      class: 'modal-lg'
    });

    this.bsModalRef.content.closeBtnName = 'Close';
  }

  public openDeleteModal(id: number): void {
    const params: DeleteBillParams = {
      id,
      reportParams: this.reportParams
    };

    this.bsModalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        prompt: 'Bạn có chắc chắn xóa hóa đơn này?',
        callback: (result) => {
          if (result === true) {
            this.store.dispatch(new ReportsActions.DeleteBill(params));
          }
        }
      }
    });
  }

}
