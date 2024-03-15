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
}
