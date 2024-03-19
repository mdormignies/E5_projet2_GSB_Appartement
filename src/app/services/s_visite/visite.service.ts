import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Visite } from '../../models/class_visite/visite';

@Injectable({
  providedIn: 'root'
})
export class VisiteService {
  private apiUrl = 'http://localhost/test-angular/src/app/models/DB_Visite/DB_Visite.php';

  constructor(private http: HttpClient) {}

  ajouterVisite(visite: Visite): Observable<any> {
    return this.http.post(this.apiUrl, visite);
  }

  modifierVisite(visite: Visite): Observable<any> {
    return this.http.post(this.apiUrl, visite);
  }

  supprimerVisite(visite: Visite): Observable<any> {
    return this.http.post(this.apiUrl, visite);
  }

  getVisitesById(TheId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?id=${TheId}`);
  }
}
