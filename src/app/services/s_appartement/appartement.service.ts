import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
}
