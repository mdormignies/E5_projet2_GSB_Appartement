import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from '@angular/router';

import { ClientSessionService } from './services/sessionsServices/client-session.service';
import { LocataireSessionService } from "./services/sessionsServices/locataire-session.service";
import { ProprietaireSessionService } from "./services/sessionsServices/proprietaire-session.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'test-angular';
  numCli: number | null = null;
  numLoc: number | null = null;
  numProp: number | null = null;

  constructor(
    private router: Router,
    private clientSessionService: ClientSessionService,
    private locataireSessionService: LocataireSessionService,
    private proprietaireSessionService: ProprietaireSessionService
  ) { }

  ngOnInit() {
    this.clientSessionService.getNumCliSubject().subscribe(numCli => {
      this.numCli = numCli;
    });
    
    this.locataireSessionService.getNumLocSubject().subscribe(numLoc => {
      this.numLoc = numLoc;
    });
    
    this.proprietaireSessionService.getNumPropSubject().subscribe(numProp => {
      this.numProp = numProp;
    });
  }

  updateNumCli(numCli: number): void {
    // Mettre à jour numCli lorsqu'un utilisateur se connecte
    this.numCli = numCli;
  }

  updateNumLoc(numLoc: number): void {
    // Mettre à jour numLoc lorsqu'un utilisateur se connecte
    this.numLoc = numLoc;
  }

  updateNumCProp(numProp: number): void {
    // Mettre à jour numProp lorsqu'un utilisateur se connecte
    this.numProp = numProp;
  }
}