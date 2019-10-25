import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyImgComponent } from './verify-img.component';

describe('VerifyImgComponent', () => {
  let component: VerifyImgComponent;
  let fixture: ComponentFixture<VerifyImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
