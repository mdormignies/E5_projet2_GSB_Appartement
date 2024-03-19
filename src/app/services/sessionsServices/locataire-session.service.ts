import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocataireSessionService {
  private numLoc: number | null = null;

  constructor() { }

  setNumLoc(numLoc: number): void {
    this.numLoc = numLoc;
  }

  getNumLoc(): number | null {
    return this.numLoc;
  }

  clearNumLoc(): void {
    this.numLoc = null;
  }
}
