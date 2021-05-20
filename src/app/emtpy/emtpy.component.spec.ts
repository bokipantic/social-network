import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmtpyComponent } from './emtpy.component';

describe('EmtpyComponent', () => {
  let component: EmtpyComponent;
  let fixture: ComponentFixture<EmtpyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmtpyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmtpyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
