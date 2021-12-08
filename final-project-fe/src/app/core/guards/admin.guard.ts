import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private alertify: AlertifyService) { }
  canActivate(): boolean {
    const role: string = JSON.parse(localStorage.getItem('user')).role;
    if (role === 'ADMIN') {
      return true;
    }
    this.alertify.error('Bạn không có quyền truy cập trang này');
    this.router.navigate(['/loi-401']);
    return false;
  }

}
