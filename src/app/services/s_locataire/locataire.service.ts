import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Locataire } from '../../models/class_locataire/locataire';

@Injectable({
  providedIn: 'root'
})
export class LocataireService {
  private apiUrl = 'http://localhost/test-angular/src/app/models/DB_locataire/DB_locataire.php';

  constructor(private http: HttpClient) {}

  loginLocataire(locataire: Locataire): Observable<any> {
    return this.http.post(this.apiUrl, locataire);
  }

  getProfil(TheId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?id=${TheId}`);
  }

  getIdByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?email=${email}`);
  }

  ajouterLocataire(locataire: Locataire): Observable<any> {
    return this.http.post(this.apiUrl, locataire);
  }

  modifierLocataire(locataire: Locataire): Observable<any> {
    return this.http.post(this.apiUrl, locataire);
  }

  supprimerLocataire(locataire: Locataire): Observable<any> {
    return this.http.post(this.apiUrl, locataire);
  }
}
