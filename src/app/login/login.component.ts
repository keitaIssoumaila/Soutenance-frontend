import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  login!: FormGroup;
  errorMessage: string = '';

  // Static email and password
  private readonly validEmail = 'keitaissmi@gmail.com';
  private readonly validPassword = 'p123457';

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.login = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


onSubmit(): void {
  if (this.login.valid) {
    const email = this.login.get('email')?.value;
    const password = this.login.get('password')?.value;

    if (email === this.validEmail && password === this.validPassword) {
      this.router.navigate(['/accueil']);
    } else {
      this.errorMessage = 'Invalid email or password';
    }
  } else {
    this.errorMessage = 'Form is invalid';
    }
  }

}