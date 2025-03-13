import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { Subscription } from 'rxjs';
import { PersonneServiceService } from '../personne-service.service';
import { JsonServiceService } from '../json-service.service';
@Component({
  selector: 'app-listes-lieux',
  templateUrl: './listes-lieux.component.html',
  styleUrls: ['./listes-lieux.component.css'],
  standalone: true,
  providers:[JsonServiceService],
  imports: [CommonModule, NavBarComponent, HttpClientModule, ReactiveFormsModule,FormsModule,RouterModule],
})
export class ListesLieuxComponent implements OnInit {
[x: string]: any;
private searchSubscription!: Subscription
    etatLieux: any[] = [];
    data:any;

    constructor(private http: HttpClient, private router: Router,  private personneService: PersonneServiceService,
      private jsonService : JsonServiceService
    ) {}
  
    ngOnInit(): void {
      this.searchSubscription = this.personneService.search$.subscribe({next: (term)=>{
        this.search(term)
      }})
      this.fetchEtatLieux();
      this.jsonService.getLargeJson().subscribe(response => {
        this.data = response;
        console.log(this.data);
      });
    }
  
    fetchEtatLieux(): void {
      this.http.get<any[]>('http://localhost:8080/lieux')
        .subscribe(
          (data) => {
            this.etatLieux = data;
          },
          (error) => {
            console.error('Erreur lors de la récupération des lieux', error);
          }
        );
    }
  
    editEtalieux(id: number): void {
      this.router.navigate(['modif-lieux', id]);
    }
  
    deleteEtatLieux(id: number): void {
      this.http.delete(`http://localhost:8080/lieux/Supprimer/${id}`)
        .subscribe(
          () => {
            console.log('Lieu supprimé avec succès');
            this.fetchEtatLieux(); // Rafraîchir la liste après la suppression
          },
          (error) => {
            console.error('Erreur lors de la suppression du lieu', error);
          }
        );
    }
    search(query: string): void {
      this.http.get<any[]>(`http://localhost:8080/lieux/rechercher?query=${query}`)
        .subscribe(
          (data) => {
            this.etatLieux = data
          },
          (error) => {
            console.error('Erreur lors de la suppression de la personne', error);
          }
        );
    }
    }