import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/core/services/sidebar.service';

@Component({
  selector: 'app-bookings-manage',
  templateUrl: './bookings-manage.component.html',
  styleUrls: ['./bookings-manage.component.scss']
})
export class BookingsManageComponent implements OnInit {

  constructor(public sidebarService: SidebarService) { }

  ngOnInit() {
  }

}
