import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, of } from 'rxjs';
import { Person, UpdatePersonDto, CreatePersonDto, PersonResponse } from '../models/person.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = `${environment.apiUrl}/persons`;

  constructor(private http: HttpClient) { }

  createPerson(createDto: CreatePersonDto): Observable<PersonResponse> {
    return this.http.post<PersonResponse>(this.apiUrl, createDto).pipe(
      catchError(this.handleError)
    );
  }

  getAllPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        // If 404 (no persons found), return empty array
        if (error.status === 404) {
          return of([]);
        }
        return this.handleError(error);
      })
    );
  }

  getPerson(id: string): Observable<Person> {
    return this.http.get<Person>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updatePerson(id: string, updateDto: UpdatePersonDto): Observable<PersonResponse> {
    return this.http.put<PersonResponse>(`${this.apiUrl}/${id}`, updateDto).pipe(
      catchError(this.handleError)
    );
  }

  deletePerson(id: string): Observable<PersonResponse> {
    return this.http.delete<PersonResponse>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.error?.message || error.message || `Error Code: ${error.status}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
