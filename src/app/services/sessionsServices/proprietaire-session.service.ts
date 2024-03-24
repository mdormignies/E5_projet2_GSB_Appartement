import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProprietaireSessionService {
  private numProp: number | null = null;
  private numPropSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);

  constructor() { }

  setNumProp(numProp: number): void {
    this.numProp = numProp;
  }

  setNumPropSubject(numProp: number): void {
    this.numPropSubject.next(numProp);
  }

  getNumProp(): number | null {
    return this.numProp;
  }

  getNumPropSubject(): Observable<number | null> {
    return this.numPropSubject.asObservable();
  }

  clearNumProp(): void {
    this.numProp = null;
    this.numPropSubject.next(null); // Nettoyer numPropSubject
  }
}
