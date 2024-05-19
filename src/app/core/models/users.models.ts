import { Watch } from './watchs.model';

export type User = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password?: string;
  watchs: Watch[];
};

export type UserLogin = {
  email: string;
  password: string;
};

export type UserCreateDto = {
  name: string;
  lastName: string;
  email: string;
  password: string;
};
