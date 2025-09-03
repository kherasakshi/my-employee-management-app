import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeBieChartsComponent } from './employee-bie-charts.component';

describe('EmployeeBieCharts', () => {
  let component: EmployeeBieChartsComponent;
  let fixture: ComponentFixture<EmployeeBieChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeBieChartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeBieChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
