import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Person } from '../models/person';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class LiaisonDBService {
  private apiUrl = 'http://localhost/test-angular/src/app/models/DB_Client.php';

  constructor(private http: HttpClient) {}

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl);
  }

  addPerson(person: Person): Observable<any> {
    return this.http.post(this.apiUrl, person);
  }

  loginClient(client: Client): Observable<any> {
    return this.http.post(this.apiUrl, client);
  }

  registerClient(client: Client): Observable<any> {
    return this.http.post(this.apiUrl , client);
  }
}