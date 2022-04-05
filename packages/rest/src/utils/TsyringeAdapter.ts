import type { ClassConstructor, IocAdapter } from 'routing-controllers'
import type { DependencyContainer } from 'tsyringe'

class TsyringeAdapter implements IocAdapter {
  // eslint-disable-next-line no-unused-vars,no-useless-constructor,no-empty-function
  public constructor(private readonly TsyringeContainer: DependencyContainer) {}

  public get<T>(someClass: ClassConstructor<T>): T {
    const childContainer = this.TsyringeContainer.createChildContainer()
    return childContainer.resolve<T>(someClass)
  }
}

export default TsyringeAdapter
