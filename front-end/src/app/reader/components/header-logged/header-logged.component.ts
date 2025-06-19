import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-logged',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-logged.component.html',
  styleUrl: './header-logged.component.css'
})
export class HeaderLoggedComponent {
  public router = inject(Router);
  
  logOut(){
    localStorage.clear();
    this.router.navigate([''])
  }
}
