import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { EnteteComponent } from '../entete/entete.component';


@Component({
    selector: 'app-modif-brigade',
    standalone: true,
    imports: [ReactiveFormsModule, EnteteComponent, NavBarComponent, FormsModule, HttpClientModule, CommonModule],
    templateUrl: './modif-brigade.component.html',
    styleUrl: './modif-brigade.component.css'
})
export class ModifBrigadeComponent implements OnInit {
    modifBrigade: FormGroup;
    brigade: any;
    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient
    ) {
        this.modifBrigade = this.fb.group({
            id: [''],
            nom: [''],
            quartier: [''],
            commune: ['']
        });
    }
    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                console.log("==============");

                this.http.get(`http://localhost:8080/brigade/recherche/${id}`).subscribe({
                    next: (value) => {
                        this.initForm(value);
                        this.brigade = value
                    },
                });
            }
        });
    }
    initForm(data: any): void {
        this.modifBrigade.setValue({
            id: data.id,
            nom: data.nom,
            quartier: data.quartier,
            commune: data.commune
        });
    }
    onSubmit(): void {
        if (this.modifBrigade.valid) {
            this.http.put(`http://localhost:8080/brigade/modifier/${this.brigade.id}`, this.modifBrigade.value).subscribe({
                next: (value) => {
                    this.router.navigateByUrl("/listesBrigade");
                },
            });
        }
    }
}

