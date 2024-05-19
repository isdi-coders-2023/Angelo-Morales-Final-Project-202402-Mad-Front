import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Watch, WatchCreateDto } from '../models/watchs.model';

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

  updateWatch(data: FormData, id: string) {
    return this.httpClient.patch<Watch>(this.url + '/' + id, data);
  }

  deleteWatch(id: string) {
    const url = this.url + '/';
    return this.httpClient.delete<Watch>(url + id);
  }
}
