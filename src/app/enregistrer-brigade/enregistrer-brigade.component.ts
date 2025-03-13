import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { EnteteComponent } from '../entete/entete.component';
@Component({
  selector: 'app-enregistrer-brigade',
  standalone: true,
  imports: [FormsModule, NavBarComponent, EnteteComponent, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './enregistrer-brigade.component.html',
  styleUrl: './enregistrer-brigade.component.css'
})
export class EnregistrerBrigadeComponent {

enregistrerBrigade!:FormGroup;
constructor(private fp: FormBuilder, private http: HttpClient, private router: Router){
}
ngOnInit(): void {
 this.enregistrerBrigade = this.fp.group({
  nom:['', Validators.required],
  quartier:['', Validators.required],
  commune:['', Validators.required],
 });
}
onSubmit(){
    if(this.enregistrerBrigade.valid){
  this.http.post<any>(this.apiUrl, this.enregistrerBrigade.value).subscribe({next: (brigade)=>{
    console.log('Formulaire enregistrer avec succès : ', brigade);
    this.enregistrerBrigade.reset();
    //alert("Formulaire enregistrer")
    this.router.navigateByUrl("/listesBrigade");
  }, error(err) {
    console.error('Erreur lors de la soumussion du formulaire', err);
    
  },})
}
}
private apiUrl ='http://localhost:8086/brigade/creer';
}