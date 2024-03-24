import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientSessionService {
  private numCli: number | null = null;
  private numCliSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);

  constructor() { }

  setNumCli(numCli: number): void {
    this.numCli = numCli;
  }

  setNumCliSubject(numCli: number): void {
    this.numCliSubject.next(numCli);
  }

  getNumCli(): number | null {
    return this.numCli;
  }

  getNumCliSubject(): Observable<number | null> {
    return this.numCliSubject.asObservable();
  }

  clearNumCli(): void {
    this.numCli = null;
    this.numCliSubject.next(null); // Nettoyer numCliSubject
  }
}