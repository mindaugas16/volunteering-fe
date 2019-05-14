import { TestBed } from '@angular/core/testing';

import { OrganizationEditService } from './organization-edit.service';

describe('OrganizationEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrganizationEditService = TestBed.get(OrganizationEditService);
    expect(service).toBeTruthy();
  });
});
