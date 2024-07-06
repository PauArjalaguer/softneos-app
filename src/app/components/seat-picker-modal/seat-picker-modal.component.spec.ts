import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatPickerModalComponent } from './seat-picker-modal.component';

describe('SeatPickerModalComponent', () => {
  let component: SeatPickerModalComponent;
  let fixture: ComponentFixture<SeatPickerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeatPickerModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatPickerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
