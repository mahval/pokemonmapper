import { TestBed, inject } from '@angular/core/testing';

import { PokemonstorageService } from './pokemonstorage.service';

describe('PokemonstorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokemonstorageService]
    });
  });

  it('should be created', inject([PokemonstorageService], (service: PokemonstorageService) => {
    expect(service).toBeTruthy();
  }));
});
