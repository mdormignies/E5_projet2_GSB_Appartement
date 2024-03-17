import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appartement } from '../../models/class_appartement/appartement';
import { AppartementService } from '../../services/s_appartement/appartement.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  appartementList: Appartement[] = [];
  filteredAppartementList: Appartement[] = [];
  arrondissements: number[] = [];
  typesAppartement: string[] = [];
  prixMin: number = 0;
  prixMax: number = 1000000;

  constructor(private router: Router, private appartementService: AppartementService) { }

  ngOnInit(): void {
    this.loadAppartement();
  }

  loadAppartement(): void {
    this.appartementService.getAppartement().subscribe((LesAppartements: Appartement[]) => {
      this.appartementList = LesAppartements;
      // Créer la liste des arrondissements disponibles
      this.arrondissements = Array.from(new Set(this.appartementList.map(app => app.arrondisse)));
      // Créer la liste des types d'appartements disponibles
      this.typesAppartement = Array.from(new Set(this.appartementList.map(app => app.typappart)));
      this.filteredAppartementList = this.appartementList;
    });
  }

  sortByArrondissement(arrondissement: number | string): void {
    if (arrondissement === 'all') {
      this.filteredAppartementList = this.appartementList;
    } else {
      this.filteredAppartementList = this.appartementList.filter(app => app.arrondisse === arrondissement);
    }
    console.log('Liste : ', this.filteredAppartementList);
  }

  sortByTypeAppartement(type: string | string[]): void {
    if (type === 'all') {
      this.filteredAppartementList = this.appartementList;
    } else {
      this.filteredAppartementList = this.appartementList.filter(app => app.typappart === type);
    }
    console.log('Liste : ', this.filteredAppartementList);
  }

  sortByPrixLocation(): void {
    this.filteredAppartementList = this.appartementList.filter(app =>
      (this.prixMin ? app.prix_loc >= this.prixMin : true) &&
      (this.prixMax ? app.prix_loc <= this.prixMax : true)
    );
    console.log('Liste : ', this.filteredAppartementList);
  }

  goToAppartement(appartement: Appartement) {
    this.router.navigate(['/appartement', appartement.numappart]);
  }
}