import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
    standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {

  @Input() isClosed = true;
  @Output() close = new EventEmitter<void>();

  closeSideBar(){
    this.close.emit();
    console.log("isClosed", this.isClosed)
  }
}
