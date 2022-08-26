import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZusatzComponent } from './zusatz.component';

describe('ZusatzComponent', () => {
  let component: ZusatzComponent;
  let fixture: ComponentFixture<ZusatzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZusatzComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZusatzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
