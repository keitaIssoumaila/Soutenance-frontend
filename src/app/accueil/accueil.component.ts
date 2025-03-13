import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [FormsModule, NavBarComponent, HttpClientModule, CommonModule, ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
  chemin:any = "Logo.jpg";
  chemin1:any = "Mali.png";
  chemin2:any = "liste.png";
}
