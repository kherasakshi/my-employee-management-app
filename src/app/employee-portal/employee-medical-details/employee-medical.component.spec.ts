import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeMedicalDetailsComponent } from './employee-medical.component.details';

describe('EmployeeMedicalDetails', () => {
  let component: EmployeeMedicalDetailsComponent;
  let fixture: ComponentFixture<EmployeeMedicalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeMedicalDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeMedicalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
