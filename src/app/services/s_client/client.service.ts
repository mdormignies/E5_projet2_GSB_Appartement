import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Client } from '../../models/class_client/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost/test-angular/src/app/models/DB_Client/DB_Client.php';

  constructor(private http: HttpClient) {}

  loginClient(client: Client): Observable<any> {
    return this.http.post(this.apiUrl, client);
  }

  registerClient(client: Client): Observable<any> {
    return this.http.post(this.apiUrl , client);
  }
}
