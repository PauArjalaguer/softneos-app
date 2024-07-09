import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEventEditComponent } from './dashboard-event-edit.component';

describe('DashboardEventEditComponent', () => {
  let component: DashboardEventEditComponent;
  let fixture: ComponentFixture<DashboardEventEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardEventEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardEventEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
