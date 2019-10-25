import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FLinkComponent } from './f-link.component';

describe('FLinkComponent', () => {
  let component: FLinkComponent;
  let fixture: ComponentFixture<FLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
