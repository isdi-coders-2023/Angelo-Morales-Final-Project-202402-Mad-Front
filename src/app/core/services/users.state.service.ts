import { Injectable, inject } from '@angular/core';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { RepoUsersService } from './repo.users.service';
import { Watch } from '../models/watchs.model';
import { WatchsRepoService } from './watchs.repo.service';

export type LoginState = 'idle' | 'logged' | 'error';

export type Payload = {
  id: string;
  email: string;
  role: string;
} & JwtPayload;

export type State = {
  loginState: LoginState;
  token: string | null;
  currentPayload: Payload | null;
  currentUser: unknown | null;
  watchs: Watch[];
};

const initialState: State = {
  loginState: 'idle',
  token: null,
  currentPayload: null,
  currentUser: null,
  watchs: [],
};

@Injectable({
  providedIn: 'root',
})
export class UsersStateService {
  jwtDecode = jwtDecode;
  private state$ = new BehaviorSubject<State>(initialState);
  private repoUsers = inject(RepoUsersService);
  private repoWatchs = inject(WatchsRepoService);
  constructor() {
    const tokenValid = localStorage.getItem('frontend');

    this.state$.next({
      ...this.state$.value,
      loginState: 'logged',
      token: tokenValid,
    });
  }
  getState(): Observable<State> {
    return this.state$.asObservable();
  }

  get state(): State {
    return this.state$.value;
  }

  setLoginState(loginState: LoginState): void {
    this.state$.next({ ...this.state$.value, loginState });
  }

  constructImageUrl(url: string, width: string, height: string) {
    const urlParts = url.split('/upload/');
    const firstPart = urlParts[0] + '/upload/';
    const secondPart = urlParts[1];
    return (
      firstPart + 'c_fill,' + 'w_' + width + ',h_' + height + '/' + secondPart
    );
  }

  setLogin(token: string) {
    const currentPayload = this.jwtDecode(token) as Payload;
    localStorage.setItem('frontend', token);
    this.repoUsers.getById(currentPayload.id).subscribe((user) => {
      this.state$.next({
        ...this.state$.value,
        loginState: 'logged',
        token: token,
        currentPayload,
        currentUser: user,
      });
    });
  }

  setLogout() {
    localStorage.removeItem('frontend');
    this.state$.next({
      ...this.state$.value,
      loginState: 'idle',
      token: null,
      currentPayload: null,
    });
  }

  loadWatchs() {
    this.repoWatchs.getWatch().subscribe((watchs) => {
      this.state$.next({ ...this.state$.value, watchs });
    });
  }
}
