export interface EmployeeAgeGroup {
  id: string;
  ageGroup: string;
  count: number;
}

export interface EmployeeProfessionStatus {
  id: string;
  profession: string;
  count: number;
}

export interface MonthlyClaim {
  id: string;
  month: string;
  avgClaimed: number;
}
