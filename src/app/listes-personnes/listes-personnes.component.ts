import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { PersonneServiceService } from '../personne-service.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-listes-personnes',
  standalone: true,
  imports: [CommonModule, NavBarComponent, FormsModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './listes-personnes.component.html',
  styleUrl: './listes-personnes.component.css'
})
export class ListesPersonnesComponent implements OnInit {
    [x: string]: any;
  private searchSubscription!: Subscription
  personnes:any[]=[]
    constructor(private http: HttpClient, private router: Router, 
    private personneService: PersonneServiceService
    ) {}
  
    ngOnInit(): void {
      
    this.searchSubscription = this.personneService.search$.subscribe({next: (term)=>{
      this.search(term)
    }})
      this.fetchPersonne();
    }
    fetchPersonne(): void {
      this.http.get<any[]>('http://localhost:8080/personne')
        .subscribe(
          (data) => {
            this.personnes = data
          },
          (error) => {
            console.error('Erreur lors de la récupération des personnes', error);
          }
        );
    }
    editPersonne(id: number): void {
      this.router.navigate(['modif-personne', id]);
    }
  
    deletePersonne(id: number): void {
      this.http.delete(`http://localhost:8080/personne/Supprimer/${id}`)
        .subscribe(
          () => {
            console.log('Personne supprimé avec succès');
            this.fetchPersonne(); // Rafraîchir la liste après la suppression
          },
          (error) => {
            console.error('Erreur lors de la suppression de la personne', error);
          }
        );
    }
  
    search(query: string): void {
      this.http.get<any[]>(`http://localhost:8080/personne/rechercher?query=${query}`)
        .subscribe(
          (data) => {
            this.personnes = data
          },
          (error) => {
            console.error('Erreur lors de la suppression de la personne', error);
          }
        );
    }
}
