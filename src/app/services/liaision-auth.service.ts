import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LiaisonAuthService {
  private isAuthenticated: boolean = false;

  login() {
    // Logique d'authentification
    this.isAuthenticated = true;
  }

  logout() {
    // Logique de déconnexion
    this.isAuthenticated = false;
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}
