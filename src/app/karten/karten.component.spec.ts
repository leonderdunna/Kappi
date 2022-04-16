import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KartenComponent } from './karten.component';

describe('KartenComponent', () => {
  let component: KartenComponent;
  let fixture: ComponentFixture<KartenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KartenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KartenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
