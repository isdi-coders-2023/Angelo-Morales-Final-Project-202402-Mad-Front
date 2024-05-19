import { TestBed } from '@angular/core/testing';

import { WatchsRepoService } from './watchs.repo.service';

describe('WatchsRepoService', () => {
  let service: WatchsRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WatchsRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
