import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { ToastService } from '../../services/toast.service';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-person-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './person-detail.component.html',
  styleUrl: './person-detail.component.css'
})
export class PersonDetailComponent implements OnInit {
  person: Person | null = null;
  loading = false;
  personId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.personId = this.route.snapshot.paramMap.get('id') || '';
    this.loadPerson();
  }

  loadPerson() {
    this.loading = true;
    this.personService.getPerson(this.personId).subscribe({
      next: (person) => {
        this.person = person;
        this.loading = false;
      },
      error: (error) => {
        this.toastService.showError(`Error loading person: ${error.message}`);
        this.loading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/persons']);
  }
}
