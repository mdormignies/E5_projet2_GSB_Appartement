import { Component, OnInit } from "@angular/core";
import { Visite } from '../../../models/class_visite/visite';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from "rxjs";

import { VisiteService } from "../../../services/s_visite/visite.service";

import { ClientSessionService } from '../../../services/sessionsServices/client-session.service';
import { LocataireSessionService } from "../../../services/sessionsServices/locataire-session.service";
import { ProprietaireSessionService } from "../../../services/sessionsServices/proprietaire-session.service";

@Component({
  selector: 'app-visite',
  templateUrl: './visite.component.html',
  styleUrl: './visite.component.css'
})
export class VisiteComponent implements OnInit {
  uneVisite: Visite = new Visite();
  lesVisites: any;
  showModifDateInput: boolean = false;

  constructor(
    private router: Router,
    private visiteService: VisiteService,
    private clientSessionService: ClientSessionService,
    private locataireSessionService: LocataireSessionService,
    private proprietaireSessionService: ProprietaireSessionService,
  ) { }

  ngOnInit() {

    //------------------------- VISITES DU CLIENT ------------------------\\

    // Récupérer le num_cli depuis le service de session client
    const numCli = this.clientSessionService.getNumCli();
    if (numCli !== null) {
      this.uneVisite.num_cli = numCli;

      // Appeler le service de visite pour récupérer les visites associées à ce client
      this.visiteService.getVisitesByNumCli(numCli).subscribe(
        (lesVisites: any) => { // Utiliser any pour accepter tout type de données
          if (lesVisites) {
            this.lesVisites = lesVisites;
            console.log(this.lesVisites);
          } else {
            console.error('Aucune visite trouvé');
          }
        },
        error => {
          console.error('Erreur lors du chargement de la liste de visites', error);
        }
      );
    }

    //------------------------- VISITES DU PROPRIETAIRE ------------------------\\

    // Récupérer le numProp depuis le service de session Proprietaire
    const numProp = this.proprietaireSessionService.getNumProp();
    if (numProp !== null) {
      this.uneVisite.num_cli = numProp;

      // Appeler le service de visite pour récupérer les visites associées à ce propriétaire
      this.visiteService.getVisitesByNumProp(numProp).subscribe(
        (lesVisites: any) => { // Utiliser any pour accepter tout type de données
          if (lesVisites) {
            this.lesVisites = lesVisites;
            console.log(this.lesVisites);
          } else {
            console.error('Aucune visite trouvé');
          }
        },
        error => {
          console.error('Erreur lors du chargement de la liste de visites', error);
        }
      );
    }
  }

  toggleModifDateInput(uneVisite: Visite) {
    uneVisite.modificationEnCours = !uneVisite.modificationEnCours;
  }

  // Vérifie si la date de visite est dans le passé
  dateInPast(nouvelle_date: Date): boolean {
    const today = new Date();
    return new Date(nouvelle_date) < today;
  }

  modifierVisite(numappart: number, num_cli: number, nouvelle_date: Date) {

    this.uneVisite.action = "modifier";
    this.uneVisite.date_visite = nouvelle_date;
    this.uneVisite.num_cli = num_cli;
    this.uneVisite.numappart = numappart;

    console.log(this.uneVisite);

    if (this.dateInPast(nouvelle_date)) {
      alert('La date de visite doit être future.');
      return; // Arrête l'exécution de la méthode si la date est dans le passé
    }

    // Appel du service pour vérifier la modification
    this.visiteService.modifierVisite(this.uneVisite).subscribe(
      (response: any) => {
        console.log(response.message);
        this.router.navigate(['/home']);
      },
      (error: any) => {
        alert('Un problème est survenue lors de la modification de la visite');
        console.error('Erreur lors de la modification', error);
      }
    );
  }

  supprimerVisite(numappart: number, num_cli: number, nouvelle_date: Date) {

    this.uneVisite.action = "supprimer";
    this.uneVisite.date_visite = nouvelle_date;
    this.uneVisite.num_cli = num_cli;
    this.uneVisite.numappart = numappart;

    console.log(this.uneVisite);

    // Appel du service pour vérifier la modification
    this.visiteService.supprimerVisite(this.uneVisite).subscribe(
      (response: any) => {
        console.log(response.message);
        this.router.navigate(['/home']);
      },
      (error: any) => {
        alert('Un problème est survenue lors de la suppression de la visite');
        console.error('Erreur lors de la suppression', error);
      }
    );
  }
}
