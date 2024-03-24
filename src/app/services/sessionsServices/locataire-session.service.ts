import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocataireSessionService {
  private numLoc: number | null = null;
  private numLocSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);

  constructor() { }

  setNumLoc(numLoc: number): void {
    this.numLoc = numLoc;
  }

  setNumLocSubject(numLoc: number): void {
    this.numLocSubject.next(numLoc);
  }

  getNumLoc(): number | null {
    return this.numLoc;
  }

  getNumLocSubject(): Observable<number | null> {
    return this.numLocSubject.asObservable();
  }

  clearNumLoc(): void {
    this.numLoc = null;
    this.numLocSubject.next(null); // Nettoyer numLocSubject
  }
}
