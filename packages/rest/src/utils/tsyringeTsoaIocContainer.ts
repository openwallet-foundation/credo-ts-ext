
import type { IocContainer } from '@tsoa/runtime';
import { container } from 'tsyringe';

export const iocContainer: IocContainer = {
  // TODO: Check and fix types later
  get: <T>(controller: any): T => {
    return container.resolve<T>(controller);
  },
};