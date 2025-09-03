import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditMedicalModalComponent } from './edit-medical-modal.component';

// import { EditMedicalModal } from './edit-medical-modal';

describe('EditMedicalModal', () => {
  let component: EditMedicalModalComponent;
  let fixture: ComponentFixture<EditMedicalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditMedicalModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMedicalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
