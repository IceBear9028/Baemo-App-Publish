import '@tanstack/react-query';
import {AxiosError} from 'axios';
import {CommonRes} from '~/shared/fetch';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError<CommonRes<unknown>>;
  }
}
