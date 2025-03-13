import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PersonneServiceService } from '../personne-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private HttpClient: HttpClient, private personneService: PersonneServiceService
  ) { }

  onSearch(event: Event) {
    this.personneService.setSearchTerm(this.getValue(event))
  }

  getValue(event: Event): string{
    return (event.target as HTMLInputElement).value
  }

  ngOnInit(): void {
   }

}
