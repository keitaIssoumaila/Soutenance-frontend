import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { EnteteComponent } from '../entete/entete.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';


@Component({
  selector: 'app-enregistrer-lieux',
  standalone: true,
  imports: [ ReactiveFormsModule, NavBarComponent, CommonModule, FormsModule, EnteteComponent, HttpClientModule],
  templateUrl: './enregistrer-lieux.component.html',
  styleUrl: './enregistrer-lieux.component.css'
})
export class EnregistrerLieuxComponent implements OnInit {
  enregistrerLieux!:FormGroup;
constructor(private fl: FormBuilder, private http: HttpClient, private router:Router){
}
ngOnInit(): void {
 this.enregistrerLieux = this.fl.group({
  lumiere:[''],
  conditionAtmosphe:[''],
  trace:[''],
  etatChause:[''],
  profil:[''],
  marquageSol:[''],
  conditionCarrefour:['']
 });
}
onSubmit(){
  if(this.enregistrerLieux.valid){
this.http.post<any>(this.apiUrl, this.enregistrerLieux.value).subscribe({next: (lieux)=>{
  console.log('Formulaire enregistrer avec succès : ', lieux);
  this.enregistrerLieux.reset();
  //alert("Formulaire enregistrer")
  this.router.navigateByUrl("/listesLieux");
}, error(err) {
  console.error('Erreur lors de la soumussion du formulaire', err);
  
},})
}
}
private apiUrl ='http://localhost:8080/lieux/creer';
    }