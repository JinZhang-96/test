import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassageDetailsComponent } from './passage-details.component';

describe('PassageDetailsComponent', () => {
  let component: PassageDetailsComponent;
  let fixture: ComponentFixture<PassageDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassageDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
