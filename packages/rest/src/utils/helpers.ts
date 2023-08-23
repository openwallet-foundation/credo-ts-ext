import { JsonTransformer } from '@aries-framework/core'
import { JsonEncoder } from '@aries-framework/core/build/utils/JsonEncoder'

export function maybeMapValues<V, U>(
  transform: (input: V) => U,
  obj?: {
    [key: string]: V
  }
) {
  if (!obj) {
    return obj
  }

  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, transform(value)]))
}

export function objectToJson<T>(result: T) {
  const serialized = JsonTransformer.serialize(result)
  return JsonEncoder.fromString(serialized)
}
