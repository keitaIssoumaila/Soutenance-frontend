import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { EnregistrerLieuxComponent } from "./enregistrer-lieux/enregistrer-lieux.component";
import { EnregistrerVehiculeComponent } from "./enregistrer-vehicule/enregistrer-vehicule.component";
import { EnregistrerBrigadeComponent } from "./enregistrer-brigade/enregistrer-brigade.component";
import { EnregistrerPersonneComponent } from "./enregistrer-personne/enregistrer-personne.component";
import { EnregistrerAccidentComponent } from "./enregistrer-accident/enregistrer-accident.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { ListesLieuxComponent } from "./listes-lieux/listes-lieux.component";
import { modifLieuxComponent } from './modif-lieux/modif-lieux.component';
import { ListesBrigadeComponent } from "./listes-brigade/listes-brigade.component";
import { ListesAccidentComponent } from './listes-accident/listes-accident.component';
import { ListesPersonnesComponent } from "./listes-personnes/listes-personnes.component";
import { ModifPersonneComponent } from "./modif-personne/modif-personne.component";
import { ListesVehiculesComponent } from "./listes-vehicules/listes-vehicules.component";
import { AccueilComponent } from './accueil/accueil.component';
import { StatistiqueComponent } from './statistique/statistique.component';
//import { AccueilComponent } from "./accueil/accueil.component";
//import { EnregistrerConducteurComponent } from './enregistrer-conducteur/enregistrer-conducteur.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AccueilComponent, EnregistrerVehiculeComponent, EnregistrerBrigadeComponent, EnregistrerPersonneComponent, EnregistrerAccidentComponent, NavBarComponent, RouterModule, EnregistrerLieuxComponent, ListesLieuxComponent, ListesBrigadeComponent, ListesPersonnesComponent, ListesVehiculesComponent, ListesAccidentComponent, StatistiqueComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-form';
}
