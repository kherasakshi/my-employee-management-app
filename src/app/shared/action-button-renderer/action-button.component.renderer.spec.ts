import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionButtonComponentRenderer } from './action-button.component.renderer';

describe('ActionButtonRenderer', () => {
  let component: ActionButtonComponentRenderer;
  let fixture: ComponentFixture<ActionButtonComponentRenderer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionButtonComponentRenderer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionButtonComponentRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
