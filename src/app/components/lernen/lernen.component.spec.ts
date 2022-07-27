import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LernenComponent } from './lernen.component';

describe('LernenComponent', () => {
  let component: LernenComponent;
  let fixture: ComponentFixture<LernenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LernenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LernenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
