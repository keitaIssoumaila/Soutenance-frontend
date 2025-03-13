import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtatLieuxService {
  private baseUrl = 'http://localhost:8080/lieux'; // Remplacez par votre URL de backend

  constructor( private http: HttpClient) {}

  getAllEtatLieux(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getEtatLieuxById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updateEtatLieux(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/Modifier/${id}`, data);
  }

  deleteEtatLieux(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Supprimer/${id}`);
  }
}
