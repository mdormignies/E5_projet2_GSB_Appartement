import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Appartement } from '../../models/class_appartement/appartement';

@Injectable({
  providedIn: 'root'
})
export class AppartementService {
  private apiUrl = 'http://localhost/test-angular/src/app/models/DB_Appartement/DB_Appartement.php';

  constructor(private http: HttpClient) {}

  getAppartement(): Observable<Appartement[]> {
    return this.http.get<Appartement[]>(this.apiUrl);
  }

  getAppartementById(appartementId: number): Observable<Appartement> {
    return this.http.get<Appartement>(`${this.apiUrl}?id=${appartementId}`);
  }
}