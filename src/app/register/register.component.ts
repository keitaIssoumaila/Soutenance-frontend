import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  register!: FormGroup;
  message: String = '';
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router){
    this.register = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onSubmit(){
    if(this.register.valid){
      this.http.post('http://localhost:8080/api/utilisateurs/register,', this.register.value).subscribe(
        (response: any) =>{
          this.message = 'Utilisateur enregistré avec succès';
          console.log("Enregistrer avec succès");
          
        },
        error =>{
          this.message = 'Une erreur est survenue lors de l\'enregistrement';
        }
      );
    }else{
      this.message = 'Formulaire invalide';
    }
  }
}
