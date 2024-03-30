export function maybeMapValues<V, U>(
  transform: (input: V) => U,
  obj?: {
    [key: string]: V
  },
) {
  if (!obj) {
    return obj
  }

  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, transform(value)]))
}
