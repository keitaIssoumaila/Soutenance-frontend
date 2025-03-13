import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { EnteteComponent } from '../entete/entete.component';

@Component({
  selector: 'app-modif-lieux',
  standalone: true,
  imports: [FormsModule, NavBarComponent, ReactiveFormsModule, HttpClientModule, CommonModule, EnteteComponent ],
  templateUrl: './modif-lieux.component.html',
  styleUrl: './modif-lieux.component.css'
})
export class modifLieuxComponent implements OnInit {

  modifLieux: FormGroup;
  lieux: any;
  constructor(
      private fl: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private http: HttpClient
  ) {
      this.modifLieux = this.fl.group({
        lumiere:[''],
        conditionAtmosphe:[''],
        trace:[''],
        etatChause:[''],
        profil:[''],
        marquageSol:[''],
        conditionCarrefour:['']
      });
  }
  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
          const id = params.get('id');
          if (id) {
              console.log("==============");

              this.http.get(`http://localhost:8080/lieux/recherche/${id}`).subscribe({
                  next: (value) => {
                      this.initForm(value);
                      this.lieux = value
                  },
              });
          }
      });
  }
  initForm(data: any): void {
      this.modifLieux.setValue({
        lumiere:data.lumiere,
        conditionAtmosphe:data.conditionAtmosphe,
        trace:data.trace,
        etatChause:data.etatChause,
        profil:data.profil,
        marquageSol:data.marquageSol,
        conditionCarrefour:data.conditionCarrefour
      });
  }
  onSubmit(): void {
      if (this.modifLieux.valid) {
          this.http.put(`http://localhost:8080/lieux/modifier/${this.lieux.id}`, this.modifLieux.value).subscribe({
              next: (value) => {
                this.router.navigateByUrl("/listesLieux");
              },
          });
      }
  }
}
