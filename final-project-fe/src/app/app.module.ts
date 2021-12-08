import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { MaterialsModule } from './modules/materials/materials.module';
import { APP_ROUTES } from './app-routing.module';
import * as fromApp from './store/app.reducer';
import { MaterialEffects } from './modules/materials/store/materials.effects';
import { MenuModule } from './modules/menu/menu.module';
import { MenuEffects } from './modules/menu/store/menu.effects';
import { EmployeesModule } from './modules/employees/employees.module';
import { EmployeeEffects } from './modules/employees/store/employees.effects';
import { CustomerEffects } from './modules/customers/store/customers.effects';
import { CustomersModule } from './modules/customers/customers.module';
import { HomeModule } from './modules/home/home.module';
import { HomeEffects } from './modules/home/store/home.effects';
import { BookingsModule } from './modules/bookings/bookings.module';
import { BookingEffects } from './modules/bookings/store/bookings.effects';
import { OrdersModule } from './modules/orders/orders.module';
import { OrderEffects } from './modules/orders/store/orders.effects';
import { ReportsModule } from './modules/reports/reports.module';
import { PromotionsModule } from './modules/promotions/promotions.module';
import { PromotionEffects } from './modules/promotions/store/promotions.effects';
import { ReportEffects } from './modules/reports/store/reports.effects';
import { environment } from 'src/environments/environment';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(APP_ROUTES, { scrollPositionRestoration: 'enabled' }),

    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([
      HomeEffects,
      MaterialEffects,
      MenuEffects,
      EmployeeEffects,
      CustomerEffects,
      BookingEffects,
      OrderEffects,
      PromotionEffects,
      ReportEffects
    ]),

    CoreModule,
    SharedModule,

    HomeModule,
    MaterialsModule,
    MenuModule,
    EmployeesModule,
    CustomersModule,
    BookingsModule,
    OrdersModule,
    ReportsModule,
    PromotionsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
