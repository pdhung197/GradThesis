import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(
      (m) => m.HomeModule
    )
  },
  {
    path: 'quan-ly',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'nguyen-lieu',
        loadChildren: () => import('./modules/materials/materials.module').then(
          (m) => m.MaterialsModule
        )
      },
      {
        path: 'thuc-don',
        loadChildren: () => import('./modules/menu/menu.module').then(
          (m) => m.MenuModule
        )
      },
      {
        path: 'nhan-vien',
        loadChildren: () => import('./modules/employees/employees.module').then(
          (m) => m.EmployeesModule
        )
      },
      {
        path: 'khach-hang',
        loadChildren: () => import('./modules/customers/customers.module').then(
          (m) => m.CustomersModule
        )
      },
      {
        path: 'dat-ban',
        loadChildren: () => import('./modules/bookings/bookings.module').then(
          (m) => m.BookingsModule
        )
      },
      {
        path: 'goi-mon',
        loadChildren: () => import('./modules/orders/orders.module').then(
          (m) => m.OrdersModule
        )
      },
      {
        path: 'bao-cao',
        loadChildren: () => import('./modules/reports/reports.module').then(
          (m) => m.ReportsModule
        )
      },
      {
        path: 'uu-dai',
        loadChildren: () => import('./modules/promotions/promotions.module').then(
          (m) => m.PromotionsModule
        )
      }
    ]
  },
  {
    path: '**', redirectTo: '', pathMatch: 'full'
  }
];
