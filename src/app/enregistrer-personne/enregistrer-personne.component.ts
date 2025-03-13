import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { EnteteComponent } from '../entete/entete.component';

@Component({
  selector: 'app-enregistrer-personne',
  standalone: true,
  imports: [ReactiveFormsModule, EnteteComponent, NavBarComponent, FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './enregistrer-personne.component.html',
  styleUrl: './enregistrer-personne.component.css'
})
  export class EnregistrerPersonneComponent implements OnInit {
    enregistrerPersonne!:FormGroup;
    type = ''
    constructor(private fp: FormBuilder, private http: HttpClient, private router: Router){
    }
   ngOnInit(): void {
     this.enregistrerPersonne = this.fp.group({
      nom:['', Validators.required],
      prenom:['', Validators.required],
      datenaise:['', Validators.required],
      profession:['', Validators.required],
      sexe:[''],
     });
   }
   onSubmit(){
        if(this.enregistrerPersonne.valid){
      this.http.post<any>(this.apiUrl, this.enregistrerPersonne.value).subscribe({next: (personne)=>{
        console.log('Formulaire enregistrer avec succès : ', personne);
        this.enregistrerPersonne.reset();
        //alert("Personne enregistrée avec succè")
        this.router.navigateByUrl("/listesPersonnes");
      }, error(err) {
        console.error('Erreur lors de la soumussion du formulaire', err);
        alert("Erreur lors de l'enregistrement de la personne")
        
      },})
    }
  }

  // onTypeChange(value:string){
  //   this.type = value
  // } 

  // getValue(event: Event): string{
  //   return (event.target as HTMLInputElement).value
  // }
  private apiUrl ='http://localhost:8080/personne/creer';
}