import { TestBed } from '@angular/core/testing';

import { ServicioRestService } from './servicio-rest.service';

describe('ServicioRestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicioRestService = TestBed.get(ServicioRestService);
    expect(service).toBeTruthy();
  });
});
