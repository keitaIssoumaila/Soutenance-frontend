import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { EnteteComponent } from '../entete/entete.component';
//import { JsonServiceService } from '../json-service.service';

@Component({
  selector: 'app-enregistrer-vehicule',
  standalone: true,
  imports: [ReactiveFormsModule, EnteteComponent, NavBarComponent, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './enregistrer-vehicule.component.html',
  styleUrl: './enregistrer-vehicule.component.css'
})
export class EnregistrerVehiculeComponent implements OnInit{
  enregistrerVehicule!:FormGroup;
  personnes: any;
  constructor(private fv: FormBuilder, private http: HttpClient, private router: Router,
    //private jsonService : JsonServiceService
  ){
  }
 ngOnInit(): void {
  this.fetchPersonne();
   this.enregistrerVehicule = this.fv.group({
    numeroMatricule:['', Validators.required],
    genre:[''],
    appartenance:[''],
    validiteAssurance:[''],
    etatGeneral:[''],
    pneux:[''],
    feux:[''],
    typeChargement:[''],
    volumeChargement:[''],
    degatMateriel:[''],
    validiteControleTechnique:[''],
    personne:[]
   });
 }
 fetchPersonne(): void {
  this.http.get<any[]>('http://localhost:8080/personne')
    .subscribe(
      (data) => {
        this.personnes = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des personnes', error);
      }
    );
}
 onSubmit(){
  if(this.enregistrerVehicule.valid){
    this.http.post<any>(this.apiUrl, this.enregistrerVehicule.value).subscribe({next: (vehicule)=>{
      console.log('Formulaire enregistrer avec succès : ', vehicule);
      this.enregistrerVehicule.reset();
    //   alert("Vehicule enregistrée avec succè")
    this.router.navigateByUrl("/listesVehicules");
    }, error(err) {
      console.error('Erreur lors de la soumussion du formulaire', err);
      
    },})
  }
}
private apiUrl ='http://localhost:8080/vehicule/creer';
}