import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class JsonServiceService {

  private apiUrl = 'http://localhost:8080/api/large-json';

  constructor(private http: HttpClient) { }

  getLargeJson(): Observable<any> {
    return this.http.get(this.apiUrl, { responseType: 'json' });
  }
}
