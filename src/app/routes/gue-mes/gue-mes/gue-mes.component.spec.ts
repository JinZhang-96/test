import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GueMesComponent } from './gue-mes.component';

describe('GusMesComponent', () => {
  let component: GueMesComponent;
  let fixture: ComponentFixture<GueMesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GueMesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GueMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
