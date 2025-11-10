import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { ToastService } from '../../services/toast.service';
import { CreatePersonDto } from '../../models/person.model';

@Component({
  selector: 'app-person-add',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './person-add.component.html',
  styleUrl: './person-add.component.css'
})
export class PersonAddComponent {
  saving = false;
  addForm: FormGroup;

  constructor(
    private router: Router,
    private personService: PersonService,
    private toastService: ToastService,
    private fb: FormBuilder
  ) {
    this.addForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      dateOfBirth: ['', [Validators.required]],
      score: ['', [Validators.required, Validators.min(0)]],
      salary: ['', [Validators.required, Validators.min(0)]],
      active: [true],
      comment: ['']
    });
  }

  save() {
    if (this.addForm.valid) {
      this.saving = true;
      const formValue = this.addForm.value;
      
      const createDto: CreatePersonDto = {
        name: formValue.name.trim(),
        dateOfBirth: formValue.dateOfBirth,
        score: parseFloat(formValue.score),
        salary: parseFloat(formValue.salary),
        active: formValue.active === true || formValue.active === 'true',
        comment: formValue.comment?.trim() || null
      };

      this.personService.createPerson(createDto).subscribe({
        next: (response) => {
          if (response.requestId) {
            this.toastService.showSuccess('Your request is being processed');
            this.saving = false;
            this.router.navigate(['/persons']);
          }
        },
        error: (error) => {
          this.toastService.showError(`Error creating person: ${error.message}`);
          this.saving = false;
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.addForm.controls).forEach(key => {
        this.addForm.get(key)?.markAsTouched();
      });
    }
  }

  cancel() {
    this.router.navigate(['/persons']);
  }

  getFieldError(fieldName: string): string {
    const field = this.addForm.get(fieldName);
    if (field && field.touched && field.errors) {
      if (field.errors['required']) {
        const fieldLabels: { [key: string]: string } = {
          'name': 'Name',
          'dateOfBirth': 'Date of Birth',
          'score': 'Score',
          'salary': 'Salary'
        };
        return `${fieldLabels[fieldName] || fieldName} is required`;
      }
      if (field.errors['minlength']) {
        return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
      if (field.errors['min']) {
        if (fieldName === 'score') {
          return `Score must be at least ${field.errors['min'].min}`;
        }
        return `Salary must be at least ${field.errors['min'].min}`;
      }
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.addForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }
}

