import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of, tap, throwError } from 'rxjs';
import {
  Employee,
  Profession,
} from '../../employee-portal/employee-list/interface-model/employee-model';

@Injectable({ providedIn: 'root' })
export class EmployeeListService {
  private apiUrl = 'http://localhost:3000/employees-list';
  private baseUrl = 'http://localhost:3000';

  private employeeListSubject = new BehaviorSubject<Employee[]>([]);
  private hasErrorSubject = new BehaviorSubject<boolean>(false);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {}

  employeeList = this.employeeListSubject.asObservable();
  hasError = this.hasErrorSubject.asObservable();
  isLoading = this.isLoadingSubject.asObservable();

  fetchEmployee() {
    this.isLoadingSubject.next(true);
    this.hasErrorSubject.next(false);
    this.http
      .get<Employee[]>(this.apiUrl)
      .pipe(
        tap((res) => {
          this.employeeListSubject.next(res);
        }),
        catchError((error) => {
          console.error('Error fetching employees:', error);
          this.employeeListSubject.next([]);
          this.hasErrorSubject.next(true);
          return of([]);
        })
      )
      .subscribe();
  }

  getProfessions() {
    return this.http.get<Profession[]>(`${this.baseUrl}/professions`).pipe(
      catchError((error) => {
        console.error('Service: Error fetching professions:', error);
        return throwError(() => new Error('Failed to load professions'));
      })
    );
  }

  addEmployee(newEmployee: Employee) {
    this.isLoadingSubject.next(true);
    return this.http.post<Employee>(this.apiUrl, newEmployee).pipe(
      tap(() => {
        this.fetchEmployee();
        this.isLoadingSubject.next(false);
      }),
      catchError((error) => {
        console.error('Service: Error adding employee', error);
        this.isLoadingSubject.next(false);
        return throwError(() => new Error('Failed to add employee'));
      })
    );
  }

  updateEmployee(id: string, updatedEmployee: Employee) {
    return this.http.put(`${this.apiUrl}/${id}`, updatedEmployee).pipe(
      tap(() => {
        this.fetchEmployee();
        this.isLoadingSubject.next(false);
      }),
      catchError((error) => {
        console.error('Service: Error updating employee', error);
        this.isLoadingSubject.next(false);
        return throwError(() => new Error('Failed to update employee'));
      })
    );
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.fetchEmployee();
        this.isLoadingSubject.next(false);
      }),
      catchError((error) => {
        console.error('Service: Error deleting employee', error);
        this.isLoadingSubject.next(false);
        return throwError(() => new Error('Failed to delete employee'));
      })
    );
  }
}

// json-server --watch db.json --port 3000
