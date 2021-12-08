import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router) { }

  ngOnInit() {
  }

  public onSubmit(): void {
    const user = this.loginForm.value;
    this.authService.login(user)
      .subscribe(next => {
        if (this.authService.currentUser.role === 'STORE_EMP') {
          this.router.navigate(['/quan-ly/nguyen-lieu']);
        } else {
          this.router.navigate(['/quan-ly/goi-mon']);
        }
        this.alertify.success('Đăng nhập thành công');
      });
  }

}
