import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-listes-brigade',
  standalone: true,
  imports: [FormsModule, NavBarComponent, ReactiveFormsModule, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './listes-brigade.component.html',
  styleUrls: ['./listes-brigade.component.css']
})
export class ListesBrigadeComponent implements OnInit {
    [x: string]: any;
    brigades: any[] = [];

    constructor(private http: HttpClient, private router: Router) {}
  
    ngOnInit(): void {
      this.fetchBrigade();
    }
  
    fetchBrigade(): void {
      this.http.get<any[]>('http://localhost:8080/brigade')
        .subscribe(
          (data) => {
            this.brigades = data;
          },
          (error) => {
            console.error('Erreur lors de la récupération des lieux', error);
          }
        );
    }
  
    editBrigade(id: number): void {
      this.router.navigate(['modif-brigade', id]);
    }
  
    deleteBrigade(id: number): void {
      this.http.delete(`http://localhost:8080/brigade/Supprimer/${id}`)
        .subscribe(
          () => {
            console.log('Lieu supprimé avec succès');
            this.fetchBrigade(); // Rafraîchir la liste après la suppression
          },
          (error) => {
            console.error('Erreur lors de la suppression du lieu', error);
          }
        );
    }
} 
