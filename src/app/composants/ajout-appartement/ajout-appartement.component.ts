import { Component, OnInit, Input } from "@angular/core";
import { Appartement } from "../../models/class_appartement/appartement";
import { Router } from '@angular/router';
import { catchError, tap, throwError } from "rxjs";

import { AppartementService } from "../../services/s_appartement/appartement.service";

@Component({
  selector: 'app-ajout-appartement',
  templateUrl: './ajout-appartement.component.html',
  styleUrls: ['./ajout-appartement.component.css']
})
export class AjoutAppartementComponent {
  appartement: Appartement = new Appartement();
  etages: number[] = [0, 1, 2, 3, 4, 5];
  arrondissements: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  ajouterAppartement(): void {
    console.log('Formulaire soumis avec les données suivantes :', this.appartement);
  }
}
