import { Component, OnInit } from "@angular/core";
import { Locataire } from '../../models/class_locataire/locataire';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from "rxjs";

import { LocataireService } from '../../services/s_locataire/locataire.service';
import { LiaisonAuthService } from '../../services/liaision-auth.service';

@Component({
  selector: 'app-login-locataire',
  templateUrl: './login-locataire.component.html',
  styleUrl: './login-locataire.component.css'
})
export class LoginLocataireComponent {

  loginLocataire: Locataire = new Locataire();

  constructor(private router: Router, private locataireService: LocataireService, private authService: LiaisonAuthService) {}

  ngOnInit() { }

  login(): void {

    this.loginLocataire.action = 'login';

    // Vérification des conditions avant la connexion
    if (this.loginLocataire.numeroloc == null || this.loginLocataire.mdp_loc.trim() === '') {
      alert('Veuillez remplir correctement tous les champs.');
      return;  // Arrêter le processus de connexion si les conditions ne sont pas remplies
    }
  
    // Appel du service pour vérifier la connexion
    this.locataireService.loginLocataire(this.loginLocataire).subscribe(
      (response: any) => {
        console.log(response.message);
        this.router.navigate(['/home']);
      },
      (error: any) => {
        alert('La connexion a échoué. Veuillez vérifier vos informations.');
        console.error('Erreur lors de la connexion', error);
      }
    );
  }
}