import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-booking-notification-modal',
  templateUrl: './booking-notification-modal.component.html',
  styleUrls: ['./booking-notification-modal.component.scss']
})
export class BookingNotificationModalComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef, private router: Router) { }

  ngOnInit() {
  }

  public goToBookingPage(): void {
    this.router.navigate(['/quan-ly/dat-ban']);
    this.bsModalRef.hide();
  }

}
