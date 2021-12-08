import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as fromApp from 'src/app/store/app.reducer';
import * as MaterialsActions from '../../store/materials.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../../store/materials.reducer';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { SearchParams, ProviderParams } from '../../store/materials.actions';
import { FormGroup, FormControl } from '@angular/forms';
import { Provider } from 'src/app/shared/models/provider.model';
import { ProviderEditComponent } from '../provider-edit/provider-edit.component';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-providers-table',
  templateUrl: './providers-table.component.html',
  styleUrls: ['./providers-table.component.scss']
})
export class ProvidersTableComponent implements OnInit {

  public data$: Observable<State>;

  public searchParams: SearchParams;
  public providerParams: ProviderParams;
  public currentPage = 1;

  public searchForm = new FormGroup({
    name: new FormControl('')
  });

  constructor(
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private store: Store<fromApp.AppState>,
    public auth: AuthService) { }

  ngOnInit() {
    this.data$ = this.store.select('materials');

    this.onPageChanged(1);

    this.searchForm.get('name').valueChanges
      .pipe(
        debounceTime(300),
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
    const search = this.searchForm.get('name').value;

    this.searchParams = {
      pageNumber: page,
      pageSize: 10,
      name: search
    };
    this.store.dispatch(new MaterialsActions.FetchProviders(this.searchParams));
  }

  public openEditModal(provider: Provider, params: SearchParams): void {
    this.bsModalRef = this.modalService.show(ProviderEditComponent, {
      initialState: {
        provider,
        params
      }
    });

    this.bsModalRef.content.closeBtnName = 'Close';
  }

  public openDeleteModal(id: number): void {
    this.providerParams = {
      id,
      params: this.searchParams
    };

    this.bsModalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        prompt: 'Bạn có chắc chắn xóa nhà cung cấp này?',
        callback: (result) => {
          if (result === true) {
            this.store.dispatch(new MaterialsActions.DeleteProvider(this.providerParams));
          }
        }
      }
    });
  }
}
