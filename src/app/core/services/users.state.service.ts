import { Injectable, inject } from '@angular/core';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { RepoUsersService } from './repo.users.service';
import { Watch } from '../models/watchs.model';
import { WatchsRepoService } from './watchs.repo.service';
import { User } from '../models/users.models';

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
  currentUser: User | null;
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

    if (tokenValid) {
      const currentPayload = this.jwtDecode(tokenValid) as Payload;
      this.state$.next({
        ...this.state$.value,
        loginState: 'logged',
        token: tokenValid,
        currentPayload,
      });
      this.loadCurrentUser(currentPayload.id);
    }
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

  deleteWatchId(id: string) {
    this.repoWatchs.deleteWatch(id).subscribe((item) => {
      const result = this.state.watchs.filter((data) => {
        return data.id !== item.id;
      });
      this.state$.next({ watchs: result } as State);
    });
  }

  loadCurrentUser(userId: string) {
    this.repoUsers.getById(userId).subscribe((user: User) => {
      this.state$.next({
        ...this.state$.value,
        currentUser: user,
      });
    });
  }

  setLogin(token: string) {
    const currentPayload = this.jwtDecode(token) as Payload;
    localStorage.setItem('frontend', token);
    this.repoUsers.getById(currentPayload.id).subscribe((user: User) => {
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
