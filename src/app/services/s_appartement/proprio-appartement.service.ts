import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Appartement } from '../../models/class_appartement/appartement';

@Injectable({
  providedIn: 'root'
})
export class ProprioAppartementService {
  private apiUrl = 'http://localhost/test-angular/src/app/models/DB_Appartement/DB_AppartementProprio.php';

  constructor(private http: HttpClient) {}

  getAppartementById(appartementId: number): Observable<Appartement[]> {
    return this.http.get<Appartement[]>(`${this.apiUrl}?id=${appartementId}`);
  }

  ajouterAppartement(appartement: Appartement): Observable<any> {
    return this.http.post(this.apiUrl, appartement);
  }

  modifierAppartement(appartement: Appartement): Observable<any> {
    return this.http.post(this.apiUrl, appartement);
  }

  supprimerAppartement(appartement: Appartement) {
    return this.http.post(this.apiUrl, appartement);
  }
}