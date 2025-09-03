import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

import { EmployeeAgeGroup, EmployeeProfessionStatus, MonthlyClaim } from './interface/employee-charts.model';
import { ChartDataService } from '../../services/employee-charts/employee-bie-charts.service';

@Component({
  selector: 'app-employee-bie-charts',
  standalone: false,
  templateUrl: './employee-bie-charts.component.html',
  styleUrl: './employee-bie-charts.component.css',
})
  
export class EmployeeBieChartsComponent implements OnInit {
  hasErrorAgeGroup: boolean = false;
  hasErrorProfession: boolean = false;
  hasErrorMonthlyClaims: boolean = false;
  overallHasError: boolean = false;

 
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [],
  };
  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Employees by Age Group' },
    },
  };


  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [],
  };
  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { position: 'right' },
      title: { display: true, text: 'Profession Distribution' },
    },
  };

  
  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [],
  };
  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Average Claimed Amount per Month' },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => '₹' + value,
        },
      },
    },
  };

  constructor(private chartService: ChartDataService) {}

  ngOnInit(): void {
    this.chartService.hasErrorAgeGroup.subscribe((val) => {
      this.hasErrorAgeGroup = val;
      this.updateOverallError();
    });

    this.chartService.hasErrorProfession.subscribe((val) => {
      this.hasErrorProfession = val;
      this.updateOverallError();
    });

    this.chartService.hasErrorMonthlyClaims.subscribe((val) => {
      this.hasErrorMonthlyClaims = val;
      this.updateOverallError();
    });

    this.fetchChartData();
  }

  updateOverallError() {
    this.overallHasError =
      this.hasErrorAgeGroup ||
      this.hasErrorProfession ||
      this.hasErrorMonthlyClaims;
  }

  fetchChartData() {
    this.chartService.getAgeGroupData().subscribe({
      next: (data: EmployeeAgeGroup[]) => {
        const labels = data.map((age) => age.ageGroup);
        const counts = data.map((data) => data.count);
        this.barChartData = {
          labels,
          datasets: [
            {
              label: 'Employees',
              data: counts,
              backgroundColor: '#60a5fa',
            },
          ],
        };
      },
    });

  this.chartService.getProfessionData().subscribe({
      next: (data: EmployeeProfessionStatus[]) => {
        const labels = data.map((prof) => prof.profession);
        const counts = data.map((data) => data.count);
        this.pieChartData = {
          labels,
          datasets: [
            {
              data: counts,
              backgroundColor: ['#f87171', '#fbbf24', '#34d399', '#60a5fa'],
            },
          ],
        };
      },
    });

    this.chartService.getMonthlyClaims().subscribe({
      next: (data: MonthlyClaim[]) => {
        const labels = data.map((month) => month.month);
        const amounts = data.map((data) => data.avgClaimed);
        this.lineChartData = {
          labels,
          datasets: [
            {
              data: amounts,
              label: 'Avg Claimed ₹',
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(59, 130, 246, 0.5)',
              fill: true,
              tension: 0.4,
            },
          ],
        };
      },
    });
  }
}
