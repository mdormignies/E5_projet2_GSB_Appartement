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
import { PersonComponent } from './composants/person/person.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    InitComponent,
    HomeComponent,
    PersonComponent,
    LoginClientComponent,
    LoginProprietaireComponent,
    LoginLocataireComponent,
    AppartementComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}