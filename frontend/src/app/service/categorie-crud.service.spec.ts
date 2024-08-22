import { TestBed } from '@angular/core/testing';

import { CategorieCrudService } from './categorie-crud.service';

describe('CategorieCrudService', () => {
  let service: CategorieCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorieCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
