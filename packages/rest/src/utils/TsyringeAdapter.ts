import type { ClassConstructor, IocAdapter } from 'routing-controllers'
import type { DependencyContainer } from 'tsyringe'

class TsyringeAdapter implements IocAdapter {
  public constructor(private readonly TsyringeContainer: DependencyContainer) {}

  public get<T>(someClass: ClassConstructor<T>): T {
    return this.TsyringeContainer.resolve<T>(someClass)
  }
}

export default TsyringeAdapter
