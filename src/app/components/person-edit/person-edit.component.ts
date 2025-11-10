import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { ToastService } from '../../services/toast.service';
import { Person, UpdatePersonDto } from '../../models/person.model';

@Component({
  selector: 'app-person-edit',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './person-edit.component.html',
  styleUrl: './person-edit.component.css'
})
export class PersonEditComponent implements OnInit {
  person: Person | null = null;
  loading = false;
  saving = false;
  personId: string = '';
  editForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService,
    private toastService: ToastService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      name: [''],
      salary: [''],
      comment: ['']
    });
  }

  ngOnInit() {
    this.personId = this.route.snapshot.paramMap.get('id') || '';
    this.loadPerson();
  }

  loadPerson() {
    this.loading = true;
    this.personService.getPerson(this.personId).subscribe({
      next: (person) => {
        this.person = person;
        this.editForm.patchValue({
          name: person.name,
          salary: person.salary,
          comment: person.comment || ''
        });
        this.loading = false;
      },
      error: (error) => {
        this.toastService.showError(`Error loading person: ${error.message}`);
        this.loading = false;
      }
    });
  }

  save() {
    if (this.editForm.valid) {
      this.saving = true;
      const formValue = this.editForm.value;
      const updateDto: UpdatePersonDto = {};

      if (formValue.name && formValue.name.trim() !== '') {
        updateDto.name = formValue.name.trim();
      }
      if (formValue.salary !== null && formValue.salary !== '') {
        updateDto.salary = parseFloat(formValue.salary);
      }
      if (formValue.comment !== null && formValue.comment !== undefined) {
        updateDto.comment = formValue.comment.trim() || null;
      }

      this.personService.updatePerson(this.personId, updateDto).subscribe({
        next: (response) => {
          if (response.requestId) {
            this.toastService.showSuccess('Your change request is being processed');
            this.saving = false;
            setTimeout(() => {
              this.router.navigate(['/persons']);
            }, 1000);
          }
        },
        error: (error) => {
          this.toastService.showError(`Error updating person: ${error.message}`);
          this.saving = false;
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/persons']);
  }
}
