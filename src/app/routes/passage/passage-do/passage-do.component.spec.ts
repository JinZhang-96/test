import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassageDoComponent } from './passage-do.component';

describe('PassageDoComponent', () => {
  let component: PassageDoComponent;
  let fixture: ComponentFixture<PassageDoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassageDoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassageDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
