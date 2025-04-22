import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-unlogged',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-unlogged.component.html',
  styleUrl: './header-unlogged.component.css'
})
export class HeaderUnloggedComponent {

}
