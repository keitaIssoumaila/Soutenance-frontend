import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EnteteComponent } from '../entete/entete.component';

@Component({
  selector: 'app-modif-vehicule',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule, EnteteComponent],
  templateUrl: './modif-vehicule.component.html',
  styleUrl: './modif-vehicule.component.css'
})
export class ModifVehiculeComponent {
  modifVehicule: FormGroup;
  vehicules: any;
  constructor(
      private fv: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private http: HttpClient
  ) {
      this.modifVehicule = this.fv.group({
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
      validiteControleTechnique:['']
      });
  }
  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
          const id = params.get('id');
          if (id) {
              console.log("==============");

              this.http.get(`http://localhost:8080/vehicule/recherche/${id}`).subscribe({
                  next: (value) => {
                      this.initForm(value);
                      this.vehicules = value
                  },
              });
          }
      });
  }
  initForm(data: any): void {
      this.modifVehicule.setValue({
        numeroMatricule:data.numeroMatricule,
        genre:data.genre,
        appartenance:data.appartenance,
        validiteAssurance:data.validiteAssurance,
        etatGeneral:data.etatGeneral,
        pneux:data.pneux,
        feux:data.feux,
        typeChargement:data.typeChargement,
        volumeChargement:data.volumeChargement,
        degatMateriel:data.degatMateriel,
        validiteControleTechnique:data.validiteControleTechnique
      });
  }
  onSubmit(): void {
      if (this.modifVehicule.valid) {
          this.http.put(`http://localhost:8080/vehicule/modifier/${this.vehicules.id}`, this.modifVehicule.value).subscribe({
              next: (value) => {
                this.router.navigateByUrl("/listesVehicules");
              },
          });
      }
  }
}
