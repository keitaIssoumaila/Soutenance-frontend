import { Component, ElementRef, OnInit, AfterViewInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import TomSelect from 'tom-select';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { EnteteComponent } from '../entete/entete.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-enregistrer-accident',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, NavBarComponent, EnteteComponent],
  templateUrl: './enregistrer-accident.component.html',
  styleUrls: ['./enregistrer-accident.component.css']
})
export class EnregistrerAccidentComponent implements OnInit, AfterViewInit, OnDestroy {
  enregistrerAccident!: FormGroup;
  vehicules: any[] = [];
  personnes: any[] = [];
  data: any;
  selectedPersonnes: any[] = [];
  etatLieux: any[] = [];
  types: string[] = ['Conducteur', 'Piéton', 'Passager', 'Propriétaire'];
  private tomSelectInstances: TomSelect[] = [];
  showPermisFields = false; // Pour contrôler la visibilité des champs de permis

  @ViewChild('personnesSelect') personnesSelect!: ElementRef;
  @ViewChild('etatLieuxSelect') etatLieuxSelect!: ElementRef;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef,

  ) { }

  ngOnInit(): void {
    this.enregistrerAccident = this.fb.group({
      dateAccident: ['', Validators.required],
      region: [''],
      heureAccident: [''],
      commune: [''],
      quartier: [''],
      intersection: [''],
      zone: [''],
      classificationRoute: [''],
      localisationGPS: [''],
      resumeAccident: [''],
      typeJour: [''],
      route: [''],
      troncon: [''],
      ville: [''],
      personnes: new FormControl([]),
      etatLieux: [],
    });

    this.fetchVehicule();
    this.fetchPersonne();
    this.fetchEtatLieux();
  }

  ngAfterViewInit() {
    this.initializeTomSelect();
  }

  ngOnDestroy() {
    this.tomSelectInstances.forEach(instance => instance.destroy());
  }

  fetchVehicule(): void {
    this.http.get<any[]>('http://localhost:8080/vehicule')
      .subscribe(data => {
        this.vehicules = data;
        this.updateTomSelectOptions();
      }, error => console.error('Erreur lors de la récupération des véhicules', error));
  }

  fetchPersonne(): void {
    this.http.get<any[]>('http://localhost:8080/personne')
      .subscribe(data => {
        this.personnes = data;
        this.updateTomSelectOptions();
      }, error => console.error('Erreur lors de la récupération des personnes', error));
  }

  fetchEtatLieux(): void {
    this.http.get<any[]>('http://localhost:8080/lieux')
      .subscribe(data => {
        this.etatLieux = data;
        this.updateTomSelectOptions();
      }, error => console.error('Erreur lors de la récupération des états de lieux', error));
  }

  initializeTomSelect() {
    this.tomSelectInstances.push(new TomSelect(this.personnesSelect.nativeElement, {
      plugins: { remove_button: { title: 'Supprimer' } },
      placeholder: 'Sélectionnez des personnes',
      hideSelected: true,
      duplicates: false,
      searchField: ['text'],
      maxItems: null,
      onChange: (values: any[]) => this.updateSelectedPersonnes(values)
    }));

    this.tomSelectInstances.push(new TomSelect(this.etatLieuxSelect.nativeElement, {
      plugins: { remove_button: { title: 'Supprimer' } },
      placeholder: 'Sélectionnez un état de lieu',
      hideSelected: true,
      duplicates: false,
      searchField: ['text'],
      maxItems: 1
    }));
  }

  updateTomSelectOptions() {
    if (this.tomSelectInstances.length) {
      this.tomSelectInstances[0].addOption(this.personnes.map(p => ({ value: p.id, text: p.nom })));
      this.tomSelectInstances[1].addOption(this.etatLieux.map(e => ({ value: e.id, text: e.profil })));
    }
  }


  updateSelectedPersonnes(personneIds: any[]) {
    this.selectedPersonnes = personneIds.map((id) => {
      const personne = this.personnes.find(p => p.id == id);
      if (personne) {
        return { id: personne.id, nom: `${personne.prenom} ${personne.nom}`, type: personne.type || '',
      vehicules:`${personne.numeroMatricule}`, numero:`${personne.numeroPermis}`, categorie:` ${personne.categoriePermis}`  };
      }
      return null;
    }).filter(personne => personne != null);

    this.enregistrerAccident.patchValue({ personnes: this.selectedPersonnes });

    // Ajuster la visibilité des champs `categoriePermis` et `numeroPermis`
    this.updatePermisFieldsVisibility();
  }
  

  onTypeChange(event: Event, personneId: number) {
    const select = event.target as HTMLSelectElement;
    const selectedType = select.value;
    this.selectedPersonnes = this.selectedPersonnes.map((p: any) => {
      if (p.id == personneId) {
        p.type = selectedType;
        return p;
      }
      return p;
    });
    this.enregistrerAccident.patchValue({ personnes: this.selectedPersonnes });

    // Ajuster la visibilité des champs `categoriePermis` et `numeroPermis`
    this.updatePermisFieldsVisibility();
  }

  updatePermisFieldsVisibility() {
    this.showPermisFields = this.selectedPersonnes.some(p => p.type === 'Conducteur');
    this.cdr.detectChanges(); // Détecter les changements manuellement si nécessaire
  }
  onVehiculeChange(event: Event, personneId: number) {
    const select = event.target as HTMLSelectElement;
    const selectedVehiculeId = select.value;

    // Trouver la personne associée
    const personne = this.selectedPersonnes.find(p => p.id === personneId);

    if (personne) { 
      // Mettre à jour les véhicules associés à cette personne
      personne.vehicules = selectedVehiculeId ? parseInt(selectedVehiculeId, 10) : null;

      // Mettre à jour la valeur du formulaire
      this.enregistrerAccident.patchValue({ personnes: this.selectedPersonnes });
    }
  }
  onPermisChange(event: Event, personneId: number) {
    const input = event.target as HTMLInputElement;
    const { id, value } = input;
    
    if (id === 'categoriePermis') {
      this.selectedPersonnes = this.selectedPersonnes.map(personne => {
        if (personne.id === personneId) {
          return { ...personne, categoriePermis: value };
        }
        return personne;
      });
    } else if (id === 'numeroPermis') {
      this.selectedPersonnes = this.selectedPersonnes.map(personne => {
        if (personne.id === personneId) {
          return { ...personne, numeroPermis: value };
        }
        return personne;
      });
    }
    
    this.enregistrerAccident.patchValue({ personnes: this.selectedPersonnes });
    this.updatePermisFieldsVisibility();
  }
  onSubmit() {
    if (this.enregistrerAccident.valid) {
      this.http.post<any>(this.apiUrl, this.enregistrerAccident.value)
        .subscribe({
          next: (accident) => {
            this.enregistrerAccident.reset();
            console.log('Formulaire enregistré avec succès : ', accident);
            this.router.navigateByUrl("/listesAccident");
          },
          error: (err) => console.error('Erreur lors de la soumission du formulaire', err)
        });
      }
    }
    private apiUrl = 'http://localhost:8080/accident/creer';
  }