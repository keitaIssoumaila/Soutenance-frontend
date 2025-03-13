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
  selector: 'app-listes-vehicules',
  standalone: true,
  imports: [CommonModule, RouterModule, NavBarComponent, HttpClientModule, FormsModule, ReactiveFormsModule],
  templateUrl: './listes-vehicules.component.html',
  styleUrls: ['./listes-vehicules.component.css'], // Corrected from styleUrl to styleUrls
  providers:[JsonServiceService]
})
export class ListesVehiculesComponent implements OnInit {
  vehicules: any[] = [];
  searchSubscription!: Subscription;
  data:any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private personneService: PersonneServiceService,
    private jsonService : JsonServiceService
  ) {}

  ngOnInit(): void {
    this.jsonService.getLargeJson().subscribe(response => {
      this.data = response;
      console.log(this.data);
    });
    this.fetchVehicule();

    this.searchSubscription = this.personneService.search$.subscribe({
      next: (term) => this.search(term)
    });
   
  }

  fetchVehicule(): void {
    this.http.get<any[]>('http://localhost:8080/vehicule').subscribe(
      (data) => {
        this.vehicules = data;
        console.log('Fetched vehicles:', data);
      },
      (error) => {
        console.error('Erreur lors de la récupération des véhicules', error);
      }
    );
  }

  editVehicule(id: number): void {
    this.router.navigate(['modif-vehicule', id]);
  }

  deleteVehicule(id: number): void {
    this.http.delete(`http://localhost:8080/vehicule/Supprimer/${id}`).subscribe(
      () => {
        console.log('Véhicule supprimé avec succès');
        this.fetchVehicule(); // Rafraîchir la liste après la suppression
      },
      (error) => {
        console.error('Erreur lors de la suppression du véhicule', error);
      }
    );
  }

  search(query: string): void {
    this.http.get<any[]>(`http://localhost:8080/vehicule/rechercher?query=${query}`).subscribe(
      (data) => {
        this.vehicules = data;
      },
      (error) => {
        console.error('Erreur lors de la recherche des véhicules', error);
      }
    );
  }
}
