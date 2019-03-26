import { TestBed, inject } from '@angular/core/testing';

import { PokemonfetcherService } from './pokemonfetcher.service';

describe('PokemonfetcherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokemonfetcherService]
    });
  });

  it('should be created', inject([PokemonfetcherService], (service: PokemonfetcherService) => {
    expect(service).toBeTruthy();
  }));
});
