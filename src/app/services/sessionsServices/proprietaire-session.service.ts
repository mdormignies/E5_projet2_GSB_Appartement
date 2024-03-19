import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProprietaireSessionService {
  private numProp: number | null = null;

  constructor() { }

  setNumProp(numProp: number): void {
    this.numProp = numProp;
  }

  getNumProp(): number | null {
    return this.numProp;
  }

  clearNumProp(): void {
    this.numProp = null;
  }
}
