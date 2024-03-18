import { Component, OnInit, Input } from "@angular/core";
import { Visite } from '../../../models/class_visite/visite';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from "rxjs";

import { VisiteService } from "../../../services/s_visite/visite.service";

import { ClientSessionService } from '../../../services/sessionsServices/client-session.service';

@Component({
  selector: 'app-ajout-visite',
  templateUrl: './ajout-visite.component.html',
  styleUrl: './ajout-visite.component.css'
})
export class AjoutVisiteComponent {

  newVisite: Visite = new Visite();
  @Input() appartementId: number | null = null;

  constructor(
    private router: Router,
    private visiteService: VisiteService,
    private clientSessionService: ClientSessionService) { }

  ngOnInit() {
    // À l'initialisation du formulaire ajout-visite, on récupère l'id du client
    const numCli = this.clientSessionService.getNumCli();
    if (numCli !== null) {
      this.newVisite.num_cli = numCli;
    } else {
      console.error('ClientId is null');
    }

    // À l'initialisation du formulaire ajout-visite, on récupère l'id de l'appartement
    if (this.appartementId !== null) {
      this.newVisite.numappart = this.appartementId;
    } else {
      console.error('appartementId is null');
    }
  }

  // Vérifie si la date de visite est dans le passé
  dateInPast(): boolean {
    const today = new Date();
    return new Date(this.newVisite.date_visite) < today;
  }

  ajouterVisite() {
    this.newVisite.action = 'ajouter';

    if (this.dateInPast()) {
      alert('La date de visite doit être future.');
      return; // Arrête l'exécution de la méthode si la date est dans le passé
    }

    // Appel du service pour vérifier l'ajout
    this.visiteService.ajouterVisite(this.newVisite).subscribe(
      (response: any) => {
        console.log(response.message);
        this.router.navigate(['/home']);
      },
      (error: any) => {
        alert('Un problème est survenue lors de l\'ajout de la visite');
        console.error('Erreur lors de la connexion', error);
      }
    );
  }
}
