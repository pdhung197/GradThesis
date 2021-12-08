import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MaterialEditComponent } from '../material-edit/material-edit.component';
import { Material } from 'src/app/shared/models/material.model';
import * as fromApp from 'src/app/store/app.reducer';
import * as MaterialsActions from '../../store/materials.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../../store/materials.reducer';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { SearchParams, MaterialParams } from '../../store/materials.actions';
import { FormGroup, FormControl } from '@angular/forms';
import { ReceiptEditComponent } from '../receipt-edit/receipt-edit.component';

@Component({
  selector: 'app-materials-table',
  templateUrl: './materials-table.component.html',
  styleUrls: ['./materials-table.component.scss']
})
export class MaterialsTableComponent implements OnInit {

  public data$: Observable<State>;

  public searchParams: SearchParams;
  public materialParams: MaterialParams;
  public currentPage = 1;

  public searchForm = new FormGroup({
    name: new FormControl('')
  });

  constructor(
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private store: Store<fromApp.AppState>) { }

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
    this.store.dispatch(new MaterialsActions.FetchMaterials(this.searchParams));
  }

  public openReceiptEditModal(material: Material, params: SearchParams): void {
    this.bsModalRef = this.modalService.show(ReceiptEditComponent, {
      initialState: {
        material,
        params
      },
      class: 'modal-lg'
    });

    this.bsModalRef.content.closeBtnName = 'Close';
  }

  public openEditModal(material: Material, params: SearchParams): void {
    this.bsModalRef = this.modalService.show(MaterialEditComponent, {
      initialState: {
        material,
        params
      }
    });

    this.bsModalRef.content.closeBtnName = 'Close';
  }

  public openDeleteModal(id: number): void {
    this.materialParams = {
      id,
      params: this.searchParams
    };

    this.bsModalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        prompt: 'Bạn có chắc chắn xóa nguyên liệu này?',
        callback: (result) => {
          if (result === true) {
            this.store.dispatch(new MaterialsActions.DeleteMaterial(this.materialParams));
          }
        }
      }
    });
  }
}
