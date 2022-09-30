import type { IocContainer } from '@tsoa/runtime'

import { container } from 'tsyringe'

export const iocContainer: IocContainer = {
  get: <T>(controller: { prototype: T }): T => {
    return container.resolve<T>(controller as never)
  },
}
