import { Routes } from '@angular/router';
import { EnregistrerBrigadeComponent } from './enregistrer-brigade/enregistrer-brigade.component';
import { EnregistrerLieuxComponent } from './enregistrer-lieux/enregistrer-lieux.component';
import { EnregistrerAccidentComponent } from './enregistrer-accident/enregistrer-accident.component';
import { EnregistrerVehiculeComponent } from './enregistrer-vehicule/enregistrer-vehicule.component';
import { EnregistrerPersonneComponent } from './enregistrer-personne/enregistrer-personne.component';
import { ListesLieuxComponent } from './listes-lieux/listes-lieux.component';
import { ListesBrigadeComponent } from './listes-brigade/listes-brigade.component';
import { ModifPersonneComponent } from './modif-personne/modif-personne.component';
import { modifLieuxComponent } from './modif-lieux/modif-lieux.component';
import { ModifBrigadeComponent } from './modif-brigade/modif-brigade.component';
import { ListesAccidentComponent } from './listes-accident/listes-accident.component';
import { ModifVehiculeComponent } from './modif-vehicule/modif-vehicule.component';
import { ModifAccidentComponent } from './modif-accident/modif-accident.component';
import { ListesPersonnesComponent } from './listes-personnes/listes-personnes.component';
import { ListesVehiculesComponent } from './listes-vehicules/listes-vehicules.component';
import { AccueilComponent } from './accueil/accueil.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { StatistiqueComponent } from './statistique/statistique.component';
//import { AccueilComponent } from './accueil/accueil.component';
export const routes: Routes = [
    //{path:'', component:AccueilComponent, pathMatch: 'full'},
    //{path:'', component:RegisterComponent},
    {path: '', component:LoginComponent, pathMatch: 'full'},
    {path:'accueil',component: AccueilComponent},
    {path:'Statistique',component: StatistiqueComponent},
    {path: 'creerBrigade', component: EnregistrerBrigadeComponent},
    {path:'creerLieux',component: EnregistrerLieuxComponent},
    {path:'creerAccident',component: EnregistrerAccidentComponent},
    {path:'creerPersonne',component: EnregistrerPersonneComponent},
    {path:'creerVehicules',component: EnregistrerVehiculeComponent},
    {path:'listesLieux',component: ListesLieuxComponent},
    {path:'listesBrigade',component: ListesBrigadeComponent},
    {path:'listesAccident',component: ListesAccidentComponent},
    {path:'listesVehicules',component: ListesVehiculesComponent},
    {path:'listesPersonnes',component: ListesPersonnesComponent},
   { path: 'modif-lieux/:id', component: modifLieuxComponent },
   { path: 'modif-brigade/:id', component: ModifBrigadeComponent },
   { path: 'modif-accident/:id', component: ModifAccidentComponent }, 
   { path: 'modif-personne/:id', component: ModifPersonneComponent },
  { path: 'modif-vehicule/:id', component: ModifVehiculeComponent }  
];
