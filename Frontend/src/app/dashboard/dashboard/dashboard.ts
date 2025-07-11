import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  sidebarClosed = true;

  toggleSideBar() {
    this.sidebarClosed = !this.sidebarClosed;
  }
}
