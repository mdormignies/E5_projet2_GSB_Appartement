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

  login() {
    // Appel du service pour vérifier l'authentification
    this.liaisonDBService.loginClient(this.loginClient).subscribe(
      (response) => {
        this.authService.login(); // Activer l'authentification

        this.router.navigate(['/home']); // Si l'authentification réussit, rediriger vers une autre page
      },
      (error) => {
        console.error("Erreur d'authentification", error);
        // Vous pouvez afficher un message d'erreur à l'utilisateur
      }
    );
  }

  register() {
    // Appel du service pour vérifier l'inscription
    this.liaisonDBService.registerClient(this.newClient).subscribe(
      (response) => {
        alert("L'inscription a été effectuée, vous pouvez à présent vous connecter.");
      },
      (error) => {
        console.error("Erreur d'inscription'", error);
      }
    );
  }

}