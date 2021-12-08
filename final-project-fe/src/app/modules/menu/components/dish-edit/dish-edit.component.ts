import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DishCategory } from 'src/app/shared/models/dish-category.model';
import { Dish } from 'src/app/shared/models/dish.model';
import { DishImageUploadParams, DishParams, SearchDishes } from '../../store/menu.actions';
import * as fromApp from 'src/app/store/app.reducer';
import * as MenuActions from '../../store/menu.actions';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-dish-edit',
  templateUrl: './dish-edit.component.html',
  styleUrls: ['./dish-edit.component.scss']
})
export class DishEditComponent implements OnInit {

  public dishForm: FormGroup;

  public imageForm = new FormGroup({
    file: new FormControl()
  });

  public dish: Dish;
  public allCategories: DishCategory[];
  public params: SearchDishes;
  public defaultCover = '../../../../../assets/images/food-default-img.png';

  @ViewChild('cover') cover: ElementRef;
  public imgChanged = false;

  constructor(public bsModalRef: BsModalRef, private store: Store<fromApp.AppState>, public auth: AuthService) { }

  ngOnInit() {
    this.dishForm = new FormGroup({
      name: new FormControl({value: '', disabled: this.auth.getCurrentUser().role !== 'ADMIN'}, Validators.required),
      unit: new FormControl({value: '', disabled: this.auth.getCurrentUser().role !== 'ADMIN'}, Validators.required),
      // tslint:disable-next-line: max-line-length
      price: new FormControl({value: '', disabled: this.auth.getCurrentUser().role !== 'ADMIN'}, [Validators.required, Validators.pattern('^[0-9]+$')]),
      description: new FormControl({value: '', disabled: this.auth.getCurrentUser().role !== 'ADMIN'}),
      categoryId: new FormControl({value: null, disabled: this.auth.getCurrentUser().role !== 'ADMIN'}, Validators.required)
    });

    if (this.dish) {
      this.dishForm.patchValue(this.dish);

      if (this.dish.attachmentId) {
        this.defaultCover = `${environment.apiUrl}/attachments/${this.dish.attachmentId}`;
      }
    }
  }

  get f() {
    return this.dishForm.controls;
  }

  public onSubmit(): void {
    const dish: Dish = {
      id: this.dish ? this.dish.id : null,
      name: this.f.name.value,
      unit: this.f.unit.value,
      price: +this.f.price.value,
      description: this.f.description.value,
      categoryId: +this.f.categoryId.value
    };

    const dishParams: DishParams = {
      id: dish.id,
      dish,
      params: this.params
    };

    (this.dish)
      ? this.store.dispatch(new MenuActions.UpdateDish(dishParams))
      : this.store.dispatch(new MenuActions.CreateDish(dishParams));

    this.bsModalRef.hide();
  }

  public onFileChanged(event: any): void {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [img] = event.target.files;
      reader.readAsDataURL(img);

      if (img.type.match(/image-*/)) {
        reader.onload = (e) => {
          this.cover.nativeElement.src = e.target.result;
        };

        const file = event.target.files[0];
        this.imageForm.get('file').setValue(file);

        this.imgChanged = true;
      }
    }
  }

  public onUploadImage(): void {
    const formData = new FormData();
    formData.append('file', this.imageForm.get('file').value);

    const dishImageParams: DishImageUploadParams = {
      id: this.dish.id,
      formData,
      params: this.params
    };

    this.store.dispatch(new MenuActions.UploadImage(dishImageParams));
    this.bsModalRef.hide();
  }

}
