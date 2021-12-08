import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Material } from 'src/app/shared/models/material.model';
import * as MaterialsActions from '../../store/materials.actions';
import * as fromApp from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { MaterialParams, SearchParams } from '../../store/materials.actions';

@Component({
  selector: 'app-material-edit',
  templateUrl: './material-edit.component.html',
  styleUrls: ['./material-edit.component.scss']
})
export class MaterialEditComponent implements OnInit {

  public materialForm = new FormGroup({
    name: new FormControl('', Validators.required),
    unit: new FormControl('', Validators.required),
    unitPrice: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    inventory: new FormControl(0, Validators.pattern('^[0-9]+$'))
  });

  public material: Material;
  public params: SearchParams;

  constructor(public bsModalRef: BsModalRef, public store: Store<fromApp.AppState>) { }

  ngOnInit() {
    if (this.material) {
      this.materialForm.patchValue(this.material);
    }
  }

  get f() {
    return this.materialForm.controls;
  }

  public onSubmit(): void {
    const material: Material = {
      id: this.material ? this.material.id : null,
      name: this.f.name.value,
      unit: this.f.unit.value,
      unitPrice: +this.f.unitPrice.value,
      inventory: +this.f.inventory.value
    };

    const id = material.id;

    const materialParams: MaterialParams = {
      id,
      material,
      params: this.params
    };

    if (this.material) {
      this.store.dispatch(new MaterialsActions.UpdateMaterial(materialParams));
    } else {
      this.store.dispatch(new MaterialsActions.CreateMaterial(materialParams));
    }

    this.bsModalRef.hide();
  }

}
