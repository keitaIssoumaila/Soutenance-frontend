import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { Subscription } from 'rxjs';
import { PersonneServiceService } from '../personne-service.service';
import { JsonServiceService } from '../json-service.service';

@Component({
  selector: 'app-listes-accident',
  standalone: true,
  imports: [CommonModule, NavBarComponent, HttpClientModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './listes-accident.component.html',
  styleUrl: './listes-accident.component.css',
  providers:[JsonServiceService]
})
export class ListesAccidentComponent {
  [x: string]: any;
  private searchSubscription!: Subscription
  data:any;
  accidents: any[] = [];

  constructor(private http: HttpClient, private router: Router,
    private personneService: PersonneServiceService, private jsonService:JsonServiceService
  ) { }

  ngOnInit(): void {
    this.jsonService.getLargeJson().subscribe(response => {
      this.data = response;
      console.log(this.data);
    });
    this.searchSubscription = this.personneService.search$.subscribe({
      next: (term) => {
        this.search(term)
      }
    })
    this.fetchAccident();
   
  }

  fetchAccident(): void {
    this.http.get<any[]>('http://localhost:8080/accident')
      .subscribe(
        (data) => {
          this.accidents = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des accidents', error);
        }
      );
  }

  editAccident(id: number): void {
    this.router.navigate(['modif-accident', id]);
  }

  deleteAccident(id: number): void {
    this.http.delete(`http://localhost:8080/accident/Supprimer/${id}`)
      .subscribe(
        () => {
          console.log('Accident supprimé avec succès');
          this.fetchAccident(); // Rafraîchir la liste après la suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression du lieu', error);
        }
      );
  }
  search(query: string): void {
    this.http.get<any[]>(`http://localhost:8080/accident/rechercher?query=${query}`)
      .subscribe(
        (data) => {
          this.accidents = data
        },
        (error) => {
          console.error('Erreur lors de la recherche de la personne', error);
        }
      );
  }
}
