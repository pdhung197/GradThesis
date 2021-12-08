import {  Component,  OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { SidebarService } from 'src/app/core/services/sidebar.service';
import { User } from '../../models/user.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[app-sidebar]',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public iSMinimized: boolean;
  constructor(private sidebarService: SidebarService, public auth: AuthService) { }

  ngOnInit() {
    this.sidebarService.isMinimized.subscribe((value) => {
      this.iSMinimized = value;
    });
  }

  public onMinimized(): void {
    this.sidebarService.isMinimized.next(!this.iSMinimized);
  }
}
