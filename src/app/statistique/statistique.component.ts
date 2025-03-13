import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonneServiceService } from '../personne-service.service';
import { Subscription } from 'rxjs';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-statistique',
  standalone: true,
  imports: [FormsModule, NavBarComponent, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './statistique.component.html',
  styleUrl: './statistique.component.css'
})
export class StatistiqueComponent implements OnInit {
  [x: string]: any;
  private searchSubscription!: Subscription
  vehicules: any[] = [];
  constructor(private http: HttpClient, private router: Router, 
    private personneService: PersonneServiceService, 
      private fp: FormBuilder,
  ){}
  ngOnInit(): void {
   this.searchSubscription = this.personneService.search$.subscribe({next: (term)=>{
       this.search(term)
     }})
    this.fetchVehicule();  
  }
  fetchVehicule(): void {
    this.http.get<any[]>('http://localhost:8080/vehicule/implications')
      .subscribe({next:
        (data) => {
          this.vehicules = data;
        },
        error:(error) => {
          console.error('Erreur lors de la récupération des Vehicules', error);
        }}
      );
  }
  search(query: string): void {
    this.http.get<any[]>(`http://localhost:8080/vehicule/rechercher?query=${query}`)
      .subscribe(
        (data) => {
          this.vehicules = data
        },
        (error) => {
          console.error('Erreur lors de la suppression de la personne', error);
        }
      );
  }

}
