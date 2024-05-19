import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UsersStateService } from '../core/services/users.state.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const stateService = inject(UsersStateService);
  const { loginState, token } = stateService.state;

  if (loginState !== 'logged') {
    return next(req);
  }

  console.log('authInterceptor', token);
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq);
};
