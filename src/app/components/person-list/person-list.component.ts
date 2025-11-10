import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { ToastService } from '../../services/toast.service';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-person-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.css'
})
export class PersonListComponent implements OnInit {
  persons: Person[] = [];
  loading = false;

  constructor(
    private personService: PersonService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPersons();
  }

  loadPersons() {
    this.loading = true;
    this.personService.getAllPersons().subscribe({
      next: (persons) => {
        this.persons = persons;
        this.loading = false;
      },
      error: (error) => {
        this.toastService.showError(`Error loading persons: ${error.message}`);
        this.persons = [];
        this.loading = false;
      }
    });
  }

  viewPerson(id: string) {
    this.router.navigate(['/persons', id]);
  }

  editPerson(id: string) {
    this.router.navigate(['/persons', id, 'edit']);
  }

  addPerson() {
    this.router.navigate(['/persons/add']);
  }

  deletePerson(id: string) {
    if (confirm('Are you sure you want to delete this person?')) {
      this.personService.deletePerson(id).subscribe({
        next: (response) => {
          if (response.requestId) {
            this.toastService.showSuccess('Delete request is being processed');
            this.loadPersons();
          }
        },
        error: (error) => {
          this.toastService.showError(`Error deleting person: ${error.message}`);
        }
      });
    }
  }
}
