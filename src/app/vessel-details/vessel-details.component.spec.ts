import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VesselDetailsComponent } from './vessel-details.component';

describe('VesselDetailsComponent', () => {
  let component: VesselDetailsComponent;
  let fixture: ComponentFixture<VesselDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VesselDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VesselDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
