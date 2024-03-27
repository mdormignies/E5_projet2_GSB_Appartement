import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Proprietaire } from '../../models/class_proprietaire/proprietaire';

@Injectable({
  providedIn: 'root'
})
export class ProprietaireService {
  private apiUrl = 'http://localhost/test-angular/src/app/models/DB_proprietaire/DB_proprietaire.php';

  constructor(private http: HttpClient) {}

  loginProprio(proprietaire: Proprietaire): Observable<any> {
    return this.http.post(this.apiUrl, proprietaire);
  }

  registerProprio(proprietaire: Proprietaire): Observable<any> {
    return this.http.post(this.apiUrl , proprietaire);
  }

  getProfil(TheId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?id=${TheId}`);
  }

  getIdByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?email=${email}`);
  }

  modifierProprio(proprietaire: Proprietaire): Observable<any> {
    return this.http.post(this.apiUrl, proprietaire);
  }

  supprimerProprio(proprietaire: Proprietaire): Observable<any> {
    return this.http.post(this.apiUrl, proprietaire);
  }
}
