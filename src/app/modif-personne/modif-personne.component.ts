import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, ValueChangeEvent } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonneServiceService } from '../personne-service.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { EnteteComponent } from '../entete/entete.component';

@Component({
  selector: 'app-modif-personne',
  standalone: true,
  imports: [FormsModule, NavBarComponent, ReactiveFormsModule, CommonModule, HttpClientModule, EnteteComponent],
  templateUrl: './modif-personne.component.html',
  styleUrl: './modif-personne.component.css'
})
export class ModifPersonneComponent {
  modifPersonne !: FormGroup;
  type!: string;
  personnes: any;
  constructor(
      private fl: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private http: HttpClient
  ) {
      this.modifPersonne = this.fl.group({
        type:['', Validators.required],
        nom:['', Validators.required],
        prenom:['', Validators.required],
        datenaise:['', Validators.required],
        profession:['', Validators.required],
        sexe:[''],
      });
  }
  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
          const id = params.get('id');
          if (id) {
              console.log("==============");

              this.http.get(`http://localhost:8080/personne/recherche/${id}`).subscribe({
                  next: (value) => {
                      this.initForm(value);
                      this.personnes = value
                      this.type = this.personnes.type
                  },
              });
          }
      });
  }
  initForm(data: any): void {
      this.modifPersonne.setValue({
      type:data.type,
      nom:data.nom,
      prenom:data.prenom,
      datenaise:data.datenaise,
      profession:data.profession,
      sexe:data.sexe,
      });
  }
  onSubmit(): void {
      if (this.modifPersonne.valid) {
          this.http.put(`http://localhost:8080/personne/modifier/${this.personnes.id}`, this.modifPersonne.value).subscribe({
              next: (value) => {
                this.router.navigateByUrl("/listesPersonnes");
              },
          });
      }
  }
  onTypeChange(value:string){
    this.type = value
  }

  getValue(event: Event): string{
    return (event.target as HTMLInputElement).value
  }
} 