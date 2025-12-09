type RecordToUnion<T extends Record<string, any>> = T[keyof T]
type ShortEmits<T extends Record<string, any>> = UnionToIntersection<
  RecordToUnion<{
    [K in keyof T]: (evt: K, ...args: T[K]) => void
  }>
>
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

// vue的emit方法的返回类型
export type emitRetuenType<T> = T extends (...args: any[]) => any ? T : ShortEmits<T>
