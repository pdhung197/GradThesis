import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public user: User;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));

    if (this.user) {
      this.authService.currentUser = this.user;
    }
  }

}
