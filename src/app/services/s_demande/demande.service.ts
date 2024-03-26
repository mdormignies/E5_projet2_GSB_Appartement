import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Demande } from '../../models/class_demande/demande';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private apiUrl = 'http://localhost/test-angular/src/app/models/DB_Demande/DB_Demande.php';

  constructor(private http: HttpClient) { }

  nouvelleDemande(demande: Demande): Observable<any> {
    return this.http.post(this.apiUrl, demande);
  }

  modifierDemande(demande: Demande): Observable<any> {
    return this.http.post(this.apiUrl, demande);
  }

  supprimerDemande(demande: Demande): Observable<any> {
    return this.http.post(this.apiUrl, demande);
  }

  getDemandesByNumCli(TheId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?idcli=${TheId}`);
  }

  getDemandesByNumProp(TheId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?idprop=${TheId}`);
  }
}
