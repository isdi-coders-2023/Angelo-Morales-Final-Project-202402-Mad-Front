import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Watch, WatchCreateDto, WatchUpdateDto } from '../models/watchs.model';

@Injectable({
  providedIn: 'root',
})
export class WatchsRepoService {
  httpClient = inject(HttpClient);
  url = environment.API_URL + '/watchs';

  getWatch() {
    return this.httpClient.get<Watch[]>(this.url + '/');
  }

  getWatchById(id: string) {
    return this.httpClient.get<Watch>(this.url + '/' + id);
  }

  createWatch(data: WatchCreateDto) {
    const url = this.url + '/';
    return this.httpClient.post(url, data);
  }

  updateWatch(id: string, data: WatchUpdateDto) {
    const url = this.url + '/';
    return this.httpClient.patch(url + id, data);
  }

  deleteWatch(id: string) {
    const url = this.url + '/';
    return this.httpClient.delete(url + id);
  }
}
