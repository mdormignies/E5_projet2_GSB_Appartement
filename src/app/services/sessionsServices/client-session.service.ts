import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientSessionService {
  private numCli: number | null = null;

  constructor() { }

  setNumCli(numCli: number): void {
    this.numCli = numCli;
  }

  getNumCli(): number | null {
    return this.numCli;
  }

  clearNumCli(): void {
    this.numCli = null;
  }
}