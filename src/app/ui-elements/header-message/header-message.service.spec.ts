import { TestBed } from '@angular/core/testing';

import { HeaderMessageService } from './header-message.service';

describe('HeaderMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeaderMessageService = TestBed.get(HeaderMessageService);
    expect(service).toBeTruthy();
  });
});
