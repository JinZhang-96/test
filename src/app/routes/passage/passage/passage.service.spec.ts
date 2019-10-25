import { TestBed, inject } from '@angular/core/testing';

import { PassageService } from './passage.service';

describe('PasswordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PassageService]
    });
  });

  it('should be created', inject([PassageService], (service: PassageService) => {
    expect(service).toBeTruthy();
  }));
});
