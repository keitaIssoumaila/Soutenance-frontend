import { Component, ElementRef, OnInit, AfterViewInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import TomSelect from 'tom-select';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { EnteteComponent } from '../entete/entete.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modif-accident',
  standalone: true,
  imports: [NavBarComponent, EnteteComponent, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './modif-accident.component.html',
  styleUrls: ['./modif-accident.component.css']
})
export class ModifAccidentComponent implements OnInit, AfterViewInit, OnDestroy {
  modifAccident!: FormGroup;
  vehicules: any[] = [];
  personnes: any[] = [];
  etatLieux: any[] = [];
  types: string[] = ['Conducteur', 'Piéton', 'Passager', 'Propriétaire'];
  selectedPersonnes: any[] = [];
  showPermisFields = false; // Pour contrôler la visibilité des champs de permis
  private accidentId: number | null = null;
  private apiUrl = 'http://localhost:8080/accident/modifier'; // URL de base pour les requêtes API
  private tomSelectInstances: TomSelect[] = [];
  

  @ViewChild('personnesSelect') personnesSelect!: ElementRef;
  @ViewChild('etatLieuxSelect') etatLieuxSelect!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.modifAccident = this.fb.group({
      id: [''],
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
      personnes: this.fb.array([]),
      etatLieux: []
    });

    this.fetchVehicule();
    this.fetchPersonne();
    this.fetchEtatLieux();

    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      if (id) {
        this.accidentId = id;
        this.fetchAccident(id);
      }
    });
  }

  get personnesArray(): FormArray {
    return this.modifAccident.get('personnes') as FormArray;
  }

  private fetchVehicule(): void {
    this.http.get<any[]>('http://localhost:8080/vehicule')
      .subscribe(data => {
        this.vehicules = data;
        this.updateTomSelectOptions();
      }, error => console.error('Erreur lors de la récupération des véhicules', error));
  }

  private fetchPersonne(): void {
    this.http.get<any[]>('http://localhost:8080/personne')
      .subscribe(data => {
        this.personnes = data;
        this.updateTomSelectOptions();
      }, error => console.error('Erreur lors de la récupération des personnes', error));
  }

  private fetchEtatLieux(): void {
    this.http.get<any[]>('http://localhost:8080/lieux')
      .subscribe(data => {
        this.etatLieux = data;
        this.updateTomSelectOptions();
      }, error => console.error('Erreur lors de la récupération des états de lieux', error));
  }

  private fetchAccident(id: number): void {
    this.http.get<any>(`${this.apiUrl}/${id}`)
      .subscribe(data => {
        this.modifAccident.patchValue(data);
        this.updatePersonnesArray(data.personnes || []);
        this.updatePermisFieldsVisibility();
        this.updateTomSelectOptions();
      }, error => console.error('Erreur lors de la récupération de l\'accident', error));
  }

  private updatePersonnesArray(personnes: any[]): void {
    const personnesArray = this.personnesArray;
    personnesArray.clear(); // Clear existing form controls

    personnes.forEach(personne => {
      personnesArray.push(this.fb.group({
        id: [personne.id],
        nom: [`${personne.prenom} ${personne.nom}`],
        type: [personne.type || ''],
        vehicules: [personne.vehicules || ''],
        numeroPermis: [personne.numeroPermis || ''],
        categoriePermis: [personne.categoriePermis || '']
      }));
    });
  }

  ngAfterViewInit() {
    this.initializeTomSelect();
  }

  ngOnDestroy() {
    this.tomSelectInstances.forEach(instance => instance.destroy());
  }

  private initializeTomSelect() {
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

  private updateTomSelectOptions() {
    if (this.tomSelectInstances.length) {
      this.tomSelectInstances[0].addOption(this.personnes.map(p => ({ value: p.id, text: p.nom })));
      this.tomSelectInstances[1].addOption(this.etatLieux.map(e => ({ value: e.id, text: e.profil })));
    }
  }

  private updateSelectedPersonnes(personneIds: any[]) {
    const personnesArray = this.personnesArray;
    this.selectedPersonnes = personneIds.map(id => {
      const personne = this.personnes.find(p => p.id == id);
      if (personne) {
        return { id: personne.id, nom: `${personne.prenom} ${personne.nom}`, type: personne.type || '', vehicules: `${personne.numeroMatricule}`, numero: `${personne.numeroPermis}`, categorie: `${personne.categoriePermis}` };
      }
      return null;
    }).filter(personne => personne != null);

    // Update FormArray
    personnesArray.clear(); // Clear existing form controls
    this.selectedPersonnes.forEach(personne => {
      personnesArray.push(this.fb.group({
        id: [personne.id],
        nom: [personne.nom],
        type: [personne.type],
        vehicules: [personne.vehicules],
        numeroPermis: [personne.numero],
        categoriePermis: [personne.categorie]
      }));
    });

    // Ajuster la visibilité des champs `categoriePermis` et `numeroPermis`
    this.updatePermisFieldsVisibility();
  }

  onTypeChange(event: Event, index: number) {
    const select = event.target as HTMLSelectElement;
    const selectedType = select.value;

    const personneGroup = this.personnesArray.at(index) as FormGroup;
    personneGroup.patchValue({ type: selectedType });

    this.updatePermisFieldsVisibility();
  }

  private updatePermisFieldsVisibility() {
    this.showPermisFields = this.selectedPersonnes.some(p => p.type === 'Conducteur');
    this.cdr.detectChanges(); // Détecter les changements manuellement si nécessaire
  }

  onVehiculeChange(event: Event, index: number) {
    const select = event.target as HTMLSelectElement;
    const selectedVehiculeId = select.value;

    const personneGroup = this.personnesArray.at(index) as FormGroup;
    personneGroup.patchValue({ vehicules: selectedVehiculeId });

    this.modifAccident.patchValue({ personnes: this.personnesArray.value });
  }

  onPermisChange(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const { id, value } = input;

    const personneGroup = this.personnesArray.at(index) as FormGroup;
    personneGroup.patchValue({ [id]: value });

    this.modifAccident.patchValue({ personnes: this.personnesArray.value });
    this.updatePermisFieldsVisibility();
  }

  onSubmit() {
    if (this.modifAccident.valid) {
      const accidentData = this.modifAccident.value;
      const request = this.accidentId 
        ? this.http.put<any>(`${this.apiUrl}/${this.accidentId}`, accidentData) 
        : this.http.post<any>(this.apiUrl, accidentData);

      request.subscribe({
        next: (accident) => {
          this.modifAccident.reset();
          console.log('Formulaire enregistré avec succès : ', accident);
          this.router.navigateByUrl("/listesAccident");
        },
        error: (err) => console.error('Erreur lors de la soumission du formulaire', err)
      });
    }
  }
}
