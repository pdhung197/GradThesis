import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { Promotion } from 'src/app/shared/models/promotion.model';
import * as fromApp from 'src/app/store/app.reducer';
import * as PromotionsActions from '../../store/promotions.actions';
import { PromotionParams, SearchPromotions } from '../../store/promotions.actions';
import { State } from '../../store/promotions.reducer';

@Component({
  selector: 'app-promotions-table',
  templateUrl: './promotions-table.component.html',
  styleUrls: ['./promotions-table.component.scss']
})
export class PromotionsTableComponent implements OnInit {

  public data$: Observable<State>;

  public searchParams: SearchPromotions;
  public promotionParams: PromotionParams;
  public currentPage = 1;

  public searchForm = new FormGroup({
    date: new FormControl('')
  });

  constructor(
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private store: Store<fromApp.AppState>,
    public auth: AuthService) { }

  ngOnInit() {
    this.data$ = this.store.select('promotions');

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
      date: search
    };
    this.store.dispatch(new PromotionsActions.FetchPromotions(this.searchParams));
  }

  public openDeleteModal(id: number): void {
    this.promotionParams = {
      id,
      params: this.searchParams
    };

    this.bsModalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        prompt: 'Bạn có chắc chắn xóa chương trình ưu đãi này?',
        callback: (result) => {
          if (result === true) {
            this.store.dispatch(new PromotionsActions.DeletePromotion(this.promotionParams));
          }
        }
      }
    });
  }

}
