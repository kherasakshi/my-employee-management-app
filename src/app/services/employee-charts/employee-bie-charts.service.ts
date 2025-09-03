import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { EmployeeAgeGroup, EmployeeProfessionStatus, MonthlyClaim } from '../../employee-portal/employee-bie-charts/interface/employee-charts.model';

@Injectable({ providedIn: 'root' })
export class ChartDataService {
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  private hasErrorAgeGroupSubject = new BehaviorSubject<boolean>(false);
  public hasErrorProfessionSubject = new BehaviorSubject<boolean>(false);
  public hasErrorMonthlyClaimsSubject = new BehaviorSubject<boolean>(false);

  public hasErrorAgeGroup = this.hasErrorAgeGroupSubject.asObservable();
  public hasErrorProfession = this.hasErrorProfessionSubject.asObservable();
  public hasErrorMonthlyClaims =
    this.hasErrorMonthlyClaimsSubject.asObservable();

  
  getAgeGroupData(): Observable<EmployeeAgeGroup[]> {
    this.hasErrorAgeGroupSubject.next(false);
    return this.http
      .get<EmployeeAgeGroup[]>(`${this.baseUrl}/employeeAgeGroups`)
      .pipe(
        catchError((error) => {
          console.error(
            'ChartDataService: Error fetching age group data:',
            error
          );
          this.hasErrorAgeGroupSubject.next(true);
          return throwError(() => new Error('Failed to load age group data'));
        })
      );
  }

  getProfessionData(): Observable<EmployeeProfessionStatus[]> {
    this.hasErrorProfessionSubject.next(false);
    fetch;
    return this.http
      .get<EmployeeProfessionStatus[]>(`${this.baseUrl}/employeeProfessions`)
      .pipe(
        catchError((error) => {
          console.error(
            'ChartDataService: Error fetching profession data:',
            error
          );
          this.hasErrorProfessionSubject.next(true);
          return throwError(() => new Error('Failed to load profession data'));
        })
      );
  }

  getMonthlyClaims(): Observable<MonthlyClaim[]> {
    this.hasErrorMonthlyClaimsSubject.next(false);
    return this.http.get<MonthlyClaim[]>(`${this.baseUrl}/monthlyClaims`).pipe(
      catchError((error) => {
        console.error(
          'ChartDataService: Error fetching monthly claims data:',
          error
        );
        this.hasErrorMonthlyClaimsSubject.next(true);
        return throwError(
          () => new Error('Failed to load monthly claims data')
        );
      })
    );
  }
}
