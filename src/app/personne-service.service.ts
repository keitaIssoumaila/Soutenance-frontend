import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonneServiceService {
  private searchSubject = new BehaviorSubject<string>('')
  search$ = this.searchSubject.asObservable()

  setSearchTerm(term: string){
    this.searchSubject.next(term)
  }
  personnes!: Observable<any[]>;
}
