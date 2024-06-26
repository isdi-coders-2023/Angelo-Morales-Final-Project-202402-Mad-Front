import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { User, UserCreateDto, UserLogin } from '../models/users.models';

@Injectable({
  providedIn: 'root',
})
export class RepoUsersService {
  httpClient = inject(HttpClient);
  url = environment.API_URL + `/users`;

  login(data: UserLogin) {
    return this.httpClient.post<{ token: string }>(this.url + '/login', data);
  }

  getById(id: string) {
    return this.httpClient.get<User>(this.url + '/' + id);
  }

  createUser(data: UserCreateDto) {
    const url = this.url + '/register';
    return this.httpClient.post(url, data);
  }
}
