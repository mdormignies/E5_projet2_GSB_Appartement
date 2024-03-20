import { Component, OnInit, Input } from "@angular/core";
import { Appartement } from "../../models/class_appartement/appartement";
import { Router } from '@angular/router';
import { catchError, tap, throwError } from "rxjs";

import { ProprioAppartementService } from "../../services/s_appartement/proprio-appartement.service";
import { ProprietaireSessionService } from "../../services/sessionsServices/proprietaire-session.service";

@Component({
  selector: 'app-ajout-appartement',
  templateUrl: './ajout-appartement.component.html',
  styleUrls: ['./ajout-appartement.component.css']
})
export class AjoutAppartementComponent {
  appartement: Appartement = new Appartement();
  etages: number[] = [0, 1, 2, 3, 4, 5];
  arrondissements: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  constructor(
    private router: Router,
    private proprioAppartementService: ProprioAppartementService,
    private proprietaireSessionService: ProprietaireSessionService,
  ) { }

  ngOnInit() {
    const numProp = this.proprietaireSessionService.getNumProp();
    if (numProp !== null) {
      this.appartement.numeroprop = numProp;
    } else {
      console.error('ProprioId is null');
    }
  }

  ajouterAppartement(): void {
    this.appartement.action = "ajouter";

    // Vérification des conditions avant l'ajout de l'appartement
    if (
      this.appartement.rue.trim() === '' ||
      this.arrondissements.indexOf(this.appartement.arrondisse) === -1 || // Vérification si l'arrondissement est dans la liste
      this.etages.indexOf(this.appartement.etage) === -1 || // Vérification si l'étage est dans la liste
      !['T2', 'T3', 'T4', 'T5', 'Studio'].includes(this.appartement.typappart) || // Vérification du type d'appartement
      this.appartement.prix_charg > this.appartement.prix_loc * 0.5 || // Vérification du prix des charges
      new Date(this.appartement.date_libre) <= new Date() // Vérification de la date de disponibilité
    ) {
      alert('Veuillez remplir correctement tous les champs.');
      return; // Arrêter le processus d'ajout si les conditions ne sont pas remplies
    }

    console.log(this.appartement);

    // Appel du service pour ajouter l'appartement
    this.proprioAppartementService.ajouterAppartement(this.appartement).subscribe(
      (response: any) => {
        console.log(response.message);
        this.router.navigate(['/home']);
      },
      (error: any) => {
        alert('L\'ajout de l\'appartement a échoué');
        console.error('Erreur lors de l\'ajout de l\'appartement', error);
      }
    );
  }
}
