import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of, tap, throwError } from 'rxjs';
import { EmployeeMedicalDetails } from '../../employee-portal/employee-medical-details/interface-model/employee-medical-model';

@Injectable({ providedIn: 'root' })
export class EmployeeMedicalService {
  private apiUrl = 'http://localhost:3000/medical-details';
  private employeeMedicalSubject = new BehaviorSubject<EmployeeMedicalDetails[]>([]);
  public hasErrorSubject = new BehaviorSubject<boolean>(false);
  public isLoadingSubject = new BehaviorSubject<boolean>(false);
  public employeeMedical = this.employeeMedicalSubject.asObservable()
  public hasError = this.hasErrorSubject.asObservable();
  public isLoading = this.isLoadingSubject.asObservable();




  constructor(private http: HttpClient) {}

  fetchMedicalDetails() {
    this.isLoadingSubject.next(true);
    this.hasErrorSubject.next(false);
    this.http
      .get<EmployeeMedicalDetails[]>(this.apiUrl)
      .pipe(
        tap((res) => {
          this.employeeMedicalSubject.next(res);
          this.isLoadingSubject.next(false);
        }),
        catchError((err) => {
          console.error('Error fetching Employees', err);
          this.employeeMedicalSubject.next([]);
          this.hasErrorSubject.next(true);
          this.isLoadingSubject.next(false);
          return of([]);
        })
      )
      .subscribe();
  }



  addMedicalDetails(data: any) {
    this.isLoadingSubject.next(true);
    return this.http.post(`${this.apiUrl}`, data).pipe(
      tap(() => {
        this.hasErrorSubject.next(false);
        this.isLoadingSubject.next(false);
        this.fetchMedicalDetails();
      }),
      catchError((err) => {
        console.error('Error adding Employees', err);
        this.hasErrorSubject.next(true);
        this.isLoadingSubject.next(false);
        return throwError(() => new Error('Failed to add medical details'));
      })
    );
  }

  updateMedicalDetails(id: number, updateMedical: any) {
    this.isLoadingSubject.next(true);
    return this.http
      .put<EmployeeMedicalDetails>(`${this.apiUrl}/${id}`, updateMedical)
      .pipe(
        tap(() => {
          this.fetchMedicalDetails();
          this.isLoadingSubject.next(false);
        }),
        catchError((error) => {
          console.error('Service: Error updating medical details', error);
          this.hasErrorSubject.next(true);
          this.isLoadingSubject.next(false);
          return throwError(
            () => new Error('Failed to update medical details')
          );
        })
      );
  }

  deleteEmployee(id: number) {
    this.isLoadingSubject.next(true);
    return this.http
      .delete<EmployeeMedicalDetails>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(() => {
          this.fetchMedicalDetails();
          this.isLoadingSubject.next(false);
        }),

        catchError((error) => {
          console.error('Service: Error deleting medical details', error);
          this.hasErrorSubject.next(true);
          this.isLoadingSubject.next(false);
          return throwError(
            () => new Error('Failed to delete medical details')
          );
        })
      );
  }
}
