import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as MaterialsActions from '../../store/materials.actions';
import * as fromApp from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { ProviderParams, SearchParams } from '../../store/materials.actions';
import { Provider } from 'src/app/shared/models/provider.model';

@Component({
  selector: 'app-provider-edit',
  templateUrl: './provider-edit.component.html',
  styleUrls: ['./provider-edit.component.scss']
})
export class ProviderEditComponent implements OnInit {

  public providerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.pattern(('^[0-9]+$'))]),
    email: new FormControl('', Validators.email),
    address: new FormControl(''),
    note: new FormControl('')
  });

  public provider: Provider;
  public params: SearchParams;

  constructor(public bsModalRef: BsModalRef, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    if (this.provider) {
      this.providerForm.patchValue(this.provider);
    }
  }

  get f() {
    return this.providerForm.controls;
  }

  public onSubmit(): void {
    const provider: Provider = {
      id: this.provider ? this.provider.id : null,
      name: this.f.name.value,
      phone: this.f.phone.value,
      email: this.f.email.value,
      address: this.f.address.value,
      note: this.f.note.value
    };

    const id = provider.id;

    const providerParams: ProviderParams = {
      id,
      provider,
      params: this.params
    };

    if (this.provider) {
      this.store.dispatch(new MaterialsActions.UpdateProvider(providerParams));
    } else {
      this.store.dispatch(new MaterialsActions.CreateProvider(providerParams));
    }

    this.bsModalRef.hide();
  }

}
