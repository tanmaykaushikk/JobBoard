import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

  @Output() toggle = new EventEmitter<void>();

  constructor(private router:Router, private serchService:SearchService){}

  logout(){
    localStorage.removeItem("user");
    this.router.navigate(['./login']);
  }

  toggleSideBar():void{
    this.toggle.emit();
  }

  onSearch(term:string){
    this.serchService.setSearchTerm(term);
  }
}
