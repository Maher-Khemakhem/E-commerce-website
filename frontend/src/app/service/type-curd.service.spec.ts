import { TestBed } from '@angular/core/testing';

import { TypeCurdService } from './type-curd.service';

describe('TypeCurdService', () => {
  let service: TypeCurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeCurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
