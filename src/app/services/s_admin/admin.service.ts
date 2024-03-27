import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost/test-angular/src/app/models/DB_Admin/DB_Admin.php';

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer les statistiques
  getStats() {
    return this.http.get(`${this.apiUrl}?stats=1`);
  }

  // Méthode pour récupérer la liste des propriétaires
  getProprietaires(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?proprietaires=1`);
  }

  // Méthode pour récupérer la liste des clients
  getClients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?clients=1`);
  }

  // Méthode pour récupérer le revenu
  getRevenu(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?revenu=1`);
  }
}
