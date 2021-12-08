import { formatDate } from '@angular/common';
import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { INgxSelectOption } from 'ngx-select-ex';
import { AuthService } from 'src/app/core/services/auth.service';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { CustomerPromotion } from 'src/app/shared/models/customer-promotion.model';
import { Customer } from 'src/app/shared/models/customer.model';
import { DishPromotion } from 'src/app/shared/models/dish-promotion.model';
import { Dish } from 'src/app/shared/models/dish.model';
import { Promotion } from 'src/app/shared/models/promotion.model';
import * as fromApp from 'src/app/store/app.reducer';
import { environment } from 'src/environments/environment';
import * as PromotionsActions from '../../store/promotions.actions';
import { PromotionEditParams } from '../../store/promotions.actions';

@Component({
  selector: 'app-promotion-edit',
  templateUrl: './promotion-edit.component.html',
  styleUrls: ['./promotion-edit.component.scss']
})
export class PromotionEditComponent implements OnInit, AfterViewChecked, OnDestroy {

  public promotionId = 0;

  public promotionForm = new FormGroup({
    describe: new FormControl('', Validators.required),
    detail: new FormControl('', Validators.required),
    file: new FormControl(),
    discountType: new FormControl('Percent', Validators.required),
    discountAmount: new FormControl(0, [Validators.required, Validators.pattern('^[0-9]+$')]),
    promotionType: new FormControl('BillPromo', Validators.required),
    billCondition: new FormControl(0, [Validators.required, Validators.pattern('^[0-9]+$')]),
    startTime: new FormControl(new Date(), Validators.required),
    endTime: new FormControl(new Date(), Validators.required),
  });

  public defaultCover = '../../../../../assets/images/blank.png';
  @ViewChild('cover') cover: ElementRef;
  public imgChanged = false;

  public allDishes: Dish[];
  public allCustomers: Customer[];
  public promotion: Promotion;

  public selectedCustomerPromos: CustomerPromotion[] = [];
  public selectedCustomers: number[] = [];
  public selectedDishPromos: DishPromotion[] = [];
  public selectedDishes: number[] = [];

  public minDate = new Date();

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private store: Store<fromApp.AppState>,
    private bsModalRef: BsModalRef,
    private modalService: BsModalService,
    public auth: AuthService) { }

  ngOnInit() {
    this.promotionId = +this.route.snapshot.params.id;

    this.store.select('promotions')
      .subscribe((data) => {
        this.allDishes = data.dishes;
        this.allCustomers = data.customers;
        this.promotion = data.promotion;
        if (data.promotion && this.promotionId) {
          this.minDate = this.promotion.startTime as Date;
          this.promotionForm.patchValue({
            ...this.promotion,
            startTime: new Date(this.promotion.startTime),
            endTime: new Date(this.promotion.endTime)
          });

          if (data.promotion.customers) {
            this.selectedCustomerPromos.push(...data.promotion.customers);

            for (const cp of this.selectedCustomerPromos) {
              this.selectedCustomers.push(cp.customerId);
            }
          }

          if (data.promotion.dishes) {
            this.selectedDishPromos.push(...data.promotion.dishes);
            for (const dp of this.selectedDishPromos) {
              this.selectedDishes.push(dp.dishId);
            }
          }

          if (data.promotion.attachmentId) {
            this.defaultCover = `${environment.apiUrl}/attachments/${this.promotion.attachmentId}`;
          }
        }
      });

    this.store.dispatch(new PromotionsActions.FetchAllDishes());
    this.store.dispatch(new PromotionsActions.FetchAllCustomers());

    if (this.promotionId) {
      this.store.dispatch(new PromotionsActions.GetPromotion(this.promotionId));
    }
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.store.dispatch(new PromotionsActions.SetPromotion(null));
  }

  get f() {
    return this.promotionForm.controls;
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
        this.f.file.setValue(file);

        this.imgChanged = true;
      }
    }
  }

  public onRemoveImage(): void {
    this.cover.nativeElement.src = this.defaultCover;
    this.f.file.setValue(null);
    this.imgChanged = false;
  }

  public onSelectDish(options: INgxSelectOption[]): void {
    // tslint:disable-next-line: no-unused-expression
    options.length < this.selectedDishPromos.length ? (this.selectedDishPromos = []) : null;
    for (const option of options) {
      if (this.selectedDishPromos.findIndex(c => c.dishId === option.value) === -1) {
        this.selectedDishPromos.push({
          dishId: +option.value,
          promotionId: (this.promotionId > 0) ? this.promotionId : null
        });
      }
    }
  }

  public onSelectCustomer(options: INgxSelectOption[]): void {
    // tslint:disable-next-line: no-unused-expression
    options.length < this.selectedCustomerPromos.length ? (this.selectedCustomerPromos = []) : null;
    for (const option of options) {
      if (this.selectedCustomerPromos.findIndex(c => c.customerId === option.value) === -1) {
        this.selectedCustomerPromos.push({
          customerId: +option.value,
          promotionId: (this.promotionId > 0) ? this.promotionId : null
        });
      }
    }
  }

  public onSubmit(): void {
    const formData = new FormData();
    formData.append('file', this.promotionForm.get('file').value);

    const promotion: Promotion = {
      id: (this.promotionId > 0) ? this.promotionId : null,
      describe: this.f.describe.value,
      detail: this.f.detail.value,
      attachmentId: (this.promotion.attachmentId) ? this.promotion.attachmentId : null,
      discountType: this.f.discountType.value,
      discountAmount: +this.f.discountAmount.value,
      promotionType: this.f.promotionType.value,
      billCondition: +this.f.billCondition.value,
      startTime: formatDate(this.f.startTime.value, 'yyyy-MM-dd', 'en'),
      endTime: formatDate(this.f.endTime.value, 'yyyy-MM-dd', 'en'),
      dishes: this.selectedDishPromos,
      customers: this.selectedCustomerPromos
    };

    if (promotion.promotionType.toLowerCase() === 'dishpromo') {
      promotion.billCondition = null;
      promotion.customers = [];
    } else if (promotion.promotionType.toLowerCase() === 'customerpromo') {
      promotion.billCondition = null;
      promotion.dishes = [];
    } else {
      promotion.customers = [];
      promotion.dishes = [];
    }

    const promotionParams: PromotionEditParams = {
      id: promotion.id,
      promotion,
      formData
    };

    if (this.promotionId > 0) {
      this.store.dispatch(new PromotionsActions.UpdatePromotion(promotionParams));
    } else {
      this.store.dispatch(new PromotionsActions.CreatePromotion(promotionParams));
    }
  }

  public onConfirm(): void {
    this.bsModalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        // tslint:disable-next-line: max-line-length
        prompt: 'Sau khi xác nhận chương trình ưu đãi sẽ được áp dụng cho các hóa đơn và không thể thay đổi được nữa.\nBạn có chắc chắn xác nhận chương trình ưu đãi này?',
        callback: (result) => {
          if (result === true) {
            this.store.dispatch(new PromotionsActions.ConfirmPromotion(this.promotionId));
          }
        }
      }
    });
  }

}
