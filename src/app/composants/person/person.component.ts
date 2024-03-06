import { Component, OnInit } from "@angular/core";
import { LiaisonDBService } from '../../services/liaison-db.service';
import { Person } from '../../models/person';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  people: Person[] = [];
  newPerson: Person = new Person();

  constructor(private router: Router, private liaisonDBService: LiaisonDBService) {}

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople(): void {
    this.liaisonDBService.getPeople().subscribe((peopleData: Person[]) => {
      this.people = peopleData;
      console.log('Liste : ', this.people);
    });
  }

  addPerson(): void {
    this.liaisonDBService.addPerson(this.newPerson).subscribe(() => {
      this.loadPeople();
      this.newPerson = new Person();
    });
  }

  greet(person: Person): string {
    return `Hello, my name is ${person.name} and I'm ${person.age} years old.`;
  }

  isAdult(person: Person): boolean {
    return person.age >= 18;
  }
}
