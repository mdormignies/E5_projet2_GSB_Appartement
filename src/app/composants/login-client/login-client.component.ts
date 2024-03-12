import { Component, OnInit } from "@angular/core";
import { Client } from '../../models/client';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from "rxjs";

import { LiaisonDBService } from '../../services/liaison-db.service';
import { LiaisonAuthService } from '../../services/liaision-auth.service';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.css']
})
export class LoginClientComponent implements OnInit {

  loginClient: Client = new Client();
  newClient: Client = new Client();

  constructor(private router: Router, private liaisonDBService: LiaisonDBService, private authService: LiaisonAuthService) {}

  ngOnInit() { }

  login(): void {

    this.loginClient.action = 'login';

    // Vérification des conditions avant la connexion
    if (this.loginClient.num_cli == null || this.loginClient.mdp_cli.trim() === '') {
      alert('Veuillez remplir correctement tous les champs.');
      return;  // Arrêter le processus de connexion si les conditions ne sont pas remplies
    }
  
    // Appel du service pour vérifier la connexion
    this.liaisonDBService.loginClient(this.loginClient).subscribe(
      (response: any) => {
        console.log(response.message);
        this.authService.login();  // Activer l'authentification et accéder au site
        this.router.navigate(['/home']);
      },
      (error: any) => {
        alert('La connexion a échoué. Veuillez vérifier vos informations.');
        console.error('Erreur lors de la connexion', error);
      }
    );
  }

  register(): void {

    this.newClient.action = 'register';

    // Vérification des conditions avant l'inscription
    if (
      this.newClient.nom_cli.trim() === '' ||
      this.newClient.prenom_cli.trim() === '' ||
      this.newClient.adresse_cli.trim() === '' ||
      this.newClient.codeville_cli.length !== 5 ||  // Vérification de la longueur du code postal
      !this.newClient.codeville_cli.startsWith('75') ||  // Vérification du préfixe du code postal
      this.newClient.tel_cli.length !== 10 ||  // Vérification de la longueur du numéro de téléphone
      !this.newClient.tel_cli.startsWith('0') ||  // Vérification du préfixe du numéro de téléphone
      this.newClient.mdp_cli.trim() === '' ||
      this.newClient.confirmMdp.trim() === '' ||
      this.newClient.mdp_cli !== this.newClient.confirmMdp
    ) {
      alert('Veuillez remplir correctement tous les champs.');
      return;  // Arrêter le processus d'inscription si les conditions ne sont pas remplies
    }

    // Appel du service pour vérifier l'inscription
    this.liaisonDBService.registerClient(this.newClient).subscribe(
      (response: any) => {
        console.log(response.message);
        this.authService.login();  // Activer l'authentification et accéder au site
        this.router.navigate(['/home']);
      },
      (error: any) => {
        alert('L\'incription a échoué');
        console.error('Erreur lors de la connexion', error);
      }
    );
  }

}