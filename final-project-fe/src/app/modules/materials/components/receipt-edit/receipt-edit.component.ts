import { Component, OnInit } from '@angular/core';
import { Material } from 'src/app/shared/models/material.model';
import { SearchParams, ReceiptParams, SearchReceipts } from '../../store/materials.actions';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import * as MaterialsActions from '../../store/materials.actions';
import { ReceiptMaterial } from 'src/app/shared/models/receipt-material.model';
import { Observable } from 'rxjs';
import { Provider } from 'src/app/shared/models/provider.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-receipt-edit',
  templateUrl: './receipt-edit.component.html',
  styleUrls: ['./receipt-edit.component.scss']
})
export class ReceiptEditComponent implements OnInit {

  public material: Material;
  public params: SearchParams;
  public receiptParams: SearchReceipts;

  public providers$: Observable<Provider[]>;

  public receiptForm = new FormGroup({
    type: new FormControl('in', Validators.required),
    providerId: new FormControl(''),
    dateTime: new FormControl('', Validators.required),
    amount: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    unitPrice: new FormControl(''),
    unit: new FormControl({ value: '', disabled: true }),
    note: new FormControl('')
  });

  constructor(public bsModalRef: BsModalRef, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.providers$ = this.store.select('materials').pipe(
      map((data) => {
        return data.allProviders;
      })
    );

    this.store.dispatch(new MaterialsActions.FetchAllProviders());

    this.receiptForm.patchValue({
      unitPrice: this.material.unitPrice,
      unit: this.material.unit
    });
  }

  get f() {
    return this.receiptForm.controls;
  }

  public onSubmit(): void {
    const receipt: ReceiptMaterial = {
      materialId: this.material.id,
      providerId: +this.f.providerId.value,
      dateTime: this.f.dateTime.value,
      amount: +this.f.amount.value,
      unitPrice: +this.f.unitPrice.value,
      unit: this.f.unit.value,
      note: this.f.note.value
    };

    if (this.f.type.value === 'out') {
      receipt.amount = -Math.abs(receipt.amount);
      receipt.providerId = null;
    }

    const receiptParams: ReceiptParams = {
      id: null,
      receipt,
      params: null
    };

    this.store.dispatch(new MaterialsActions.CreateReceipt(receiptParams));

    this.bsModalRef.hide();
  }

}
