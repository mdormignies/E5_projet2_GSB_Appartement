import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from "rxjs";

import { Appartement } from '../../models/class_appartement/appartement';

import { AppartementService } from '../../services/s_appartement/appartement.service';
import { LiaisonAuthService } from '../../services/liaision-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  appartementList: Appartement[] = [];

  constructor(private router: Router, private appartementService: AppartementService, private authService: LiaisonAuthService) {}

  ngOnInit(): void {
    this.loadAppartement();
  }

  loadAppartement(): void {
    this.appartementService.getAppartement().subscribe((LesAppartements: Appartement[]) => {
      this.appartementList = LesAppartements;
      console.log('Liste : ', this.appartementList);
    });
  }

}
