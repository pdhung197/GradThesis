import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from '../../store/materials.reducer';
import { SearchReceipts, ReceiptParams } from '../../store/materials.actions';
import { FormGroup, FormControl } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import * as MaterialsActions from '../../store/materials.actions';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { distinctUntilChanged } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-receipts-table',
  templateUrl: './receipts-table.component.html',
  styleUrls: ['./receipts-table.component.scss']
})
export class ReceiptsTableComponent implements OnInit {

  public data$: Observable<State>;

  public searchParams: SearchReceipts;
  public receiptParams: ReceiptParams;
  public currentPage = 1;

  public searchForm = new FormGroup({
    date: new FormControl(''),
    type: new FormControl('')
  });

  constructor(
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private store: Store<fromApp.AppState>,
    public auth: AuthService) { }

  ngOnInit() {
    this.data$ = this.store.select('materials');

    this.onPageChanged(1);

    this.searchForm.get('date').valueChanges
      .pipe(
        distinctUntilChanged()
      ).subscribe(() => {
        if (this.currentPage === 1) {
          this.onPageChanged(1);
        } else {
          this.currentPage = 1;
        }
      });
    this.searchForm.get('type').valueChanges
      .pipe(
        distinctUntilChanged()
      ).subscribe(() => {
        if (this.currentPage === 1) {
          this.onPageChanged(1);
        } else {
          this.currentPage = 1;
        }
      });
  }

  public onPageChanged(page: number): void {
    let search = this.searchForm.get('date').value;
    if (search) {
      search = formatDate(search, 'yyyy-MM-dd', 'en');
    } else {
      search = '';
    }

    this.searchParams = {
      pageNumber: page,
      pageSize: 10,
      date: search,
      type: this.searchForm.get('type').value
    };
    this.store.dispatch(new MaterialsActions.FetchReceipts(this.searchParams));
  }

  public openDeleteModal(id: number): void {
    this.receiptParams = {
      id,
      params: this.searchParams
    };

    this.bsModalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        prompt: 'Bạn có chắc chắn xóa lịch sử này?',
        callback: (result) => {
          if (result === true) {
            this.store.dispatch(new MaterialsActions.DeleteReceipt(this.receiptParams));
          }
        }
      }
    });
  }

}
