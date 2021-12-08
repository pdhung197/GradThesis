import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/core/services/sidebar.service';

@Component({
  selector: 'app-wedding-bookings-manage',
  templateUrl: './wedding-bookings-manage.component.html',
  styleUrls: ['./wedding-bookings-manage.component.scss']
})
export class WeddingBookingsManageComponent implements OnInit {

  constructor(public sidebarService: SidebarService) { }

  ngOnInit() {
  }

}
