import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaketeComponent } from './pakete.component';

describe('PaketeComponent', () => {
  let component: PaketeComponent;
  let fixture: ComponentFixture<PaketeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaketeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaketeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
