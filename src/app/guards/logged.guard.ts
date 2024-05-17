import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UsersStateService, State } from '../core/services/users.state.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const loggedGuard: CanActivateFn = (_route, _stateRoute) => {
  const stateSrv = inject(UsersStateService);
  const userState: State = stateSrv.state;

  if (userState.loginState !== 'logged') {
    console.log('Guard block navigate: LoginState', userState.loginState);
    return false;
  }

  return true;
};
