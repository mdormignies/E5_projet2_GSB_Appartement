import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitComponent } from './composants/init/init.component';
import { HomeComponent } from './composants/home/home.component';
import { LoginClientComponent } from './composants/login-client/login-client.component';
import { LoginProprietaireComponent } from './composants/login-proprietaire/login-proprietaire.component';
import { LoginLocataireComponent } from './composants/login-locataire/login-locataire.component';
import { AppartementComponent } from './composants/appartement/appartement/appartement.component';
import { VisiteComponent } from './composants/visite/visite/visite.component';
import { AjoutAppartementComponent } from './composants/ajout-appartement/ajout-appartement.component'; 
import { AjoutVisiteComponent } from './composants/ajout-visite/ajout-visite/ajout-visite.component';
import { AjoutDemandeComponent } from './composants/ajout-demande/ajout-demande.component';
import { ProfilComponent } from './composants/profil/profil.component';
import { DemandeComponent } from './composants/demande/demande.component';
import { PersonComponent } from './composants/person/person.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppartementBorderCardDirective } from './directives/appartementBorderCard/appartement-border-card.directive';
import { HttpClientModule } from '@angular/common/http';
import { ClientLiaisonAuthService } from './services/s_liaison-auth/client-liaision-auth.service';
import { LocataireLiaisonAuthService } from './services/s_liaison-auth/locataire-liaison-auth.service';
import { ProprietaireLiaisonAuthService } from './services/s_liaison-auth/proprietaire-liaison-auth.service';
import { AuthGuard } from './services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    InitComponent,
    HomeComponent,
    PersonComponent,
    LoginClientComponent,
    LoginProprietaireComponent,
    LoginLocataireComponent,
    AppartementComponent,
    AppartementBorderCardDirective,
    VisiteComponent,
    AjoutAppartementComponent,
    AjoutVisiteComponent,
    AjoutDemandeComponent,
    ProfilComponent,
    DemandeComponent
    // Ajoutez d'autres composants si nécessaire
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule
    // Ajoutez d'autres modules si nécessaire
  ],
  providers: [AuthGuard, ClientLiaisonAuthService, LocataireLiaisonAuthService, ProprietaireLiaisonAuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}